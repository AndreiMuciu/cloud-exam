/* Cert Exam Simulator (AWS, Azure, GCP, Kubernetes, HashiCorp) - vanilla JS, no build step.
 * Question banks live in data/<EXAM>.js and are loaded on demand; data/index.js is the catalogue.
 * State is kept in memory and mirrored to localStorage so a refresh does not lose an exam in progress.
 */
(function () {
  'use strict';

  const INDEX = window.EXAM_INDEX || { exams: {}, sources: {} };
  const EXAMS = INDEX.exams;
  const SOURCES = INDEX.sources;
  const LS_HISTORY = 'ccp.history.v2';
  const LS_SESSION = 'ccp.session.v2';
  const LS_WRONG = 'ccp.wrong.v2';        // { "<EXAM>": [ids] }
  const LS_EXAM = 'ccp.exam';
  const LS_THEME = 'ccp.theme';

  const $ = (id) => document.getElementById(id);
  const views = { home: $('view-home'), exam: $('view-exam'), results: $('view-results') };

  let currentExam = load(LS_EXAM, null);
  if (!EXAMS[currentExam]) currentExam = Object.keys(EXAMS)[0];
  let session = null;      // current exam/practice session
  let tickHandle = null;   // timer interval
  let reviewFilter = 'all';

  /* ------------------------------------------------------------------ utils */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function sample(arr, n) { return shuffle(arr).slice(0, Math.min(n, arr.length)); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function fmtClock(sec) {
    sec = Math.max(0, Math.round(sec));
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return h ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  }
  function fmtDuration(sec) {
    sec = Math.max(0, Math.round(sec));
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    if (h) return `${h}h ${pad(m)}m`;
    return m ? `${m}m ${pad(s)}s` : `${s}s`;
  }
  function pct(a, b) { return b ? Math.round((a / b) * 1000) / 10 : 0; }
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    const s = new Set(a);
    return b.every((x) => s.has(x));
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function load(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  }
  function save(key, val) {
    try { if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
  }
  function clampInt(v, min, max, def) {
    const n = parseInt(v, 10);
    if (Number.isNaN(n)) return def;
    return Math.min(max, Math.max(min, n));
  }
  function isUrl(s) { return /^https?:\/\/\S+$/.test(s || ''); }

  function sourceName(prefix) { return (SOURCES[prefix] && SOURCES[prefix].name) || prefix; }
  function sourcesLabel(q) {
    // "kn:14-19" -> "kananinirav exam 14", "dt:87" -> "Ditectrev"
    const parts = new Set();
    q.sources.forEach((s) => {
      const [p, rest] = s.split(':');
      if (p === 'kn') parts.add(`Practice exam ${rest.split('-')[0]}`);
      else parts.add(sourceName(p));
    });
    return [...parts].join(' · ');
  }
  function disputedHtml(it) {
    if (!it.disputed || !it.disputed.length) return '';
    const alts = it.disputed.map((d) => `<li>${esc(sourceName(d.source.split(':')[0]))} marks: <strong>${esc(d.answer.join(' + '))}</strong></li>`).join('');
    return `<div class="disputed">⚠ Sources disagree on this answer. Shown as correct: the first source's key. Alternatives:<ul>${alts}</ul>Verify against the official docs.</div>`;
  }
  function explanationHtml(text, label) {
    if (!text) return '';
    if (isUrl(text)) return `<a href="${esc(text)}" target="_blank" rel="noopener">${label || 'Explanation'} ↗</a>`;
    return `<details class="expl"><summary>${label || 'Explanation'}</summary><div>${esc(text)}</div></details>`;
  }

  // Minimal, safe markdown for lab tasks/solutions: fenced code, inline code, bold, bullets, paragraphs. Everything is escaped first.
  function mdLite(src) {
    const codes = [];
    let t = String(src || '').replace(/```[\w-]*[ \t]*\n([\s\S]*?)```/g, (_, c) => { codes.push(c.replace(/\n$/, '')); return `\u0000${codes.length - 1}\u0000`; });
    t = esc(t);
    t = t.replace(/`([^`\n]+)`/g, '<code>$1</code>').replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    const out = []; let list = null;
    t.split('\n').forEach((line) => {
      const h = line.match(/^\s*(#{1,4})\s+(.*)$/);
      if (h) { if (list) { out.push(`<ul>${list.join('')}</ul>`); list = null; } out.push(`<p class="md-h${h[1].length}"><strong>${h[2]}</strong></p>`); return; }
      const m = line.match(/^\s*(?:[-*]|\d+[.)])\s+(.*)$/);
      if (m) { if (!list) { list = []; } list.push(`<li>${m[1]}</li>`); return; }
      if (list) { out.push(`<ul>${list.join('')}</ul>`); list = null; }
      if (line.trim() === '') return;
      out.push(/^\u0000\d+\u0000$/.test(line.trim()) ? line.trim() : `<p>${line}</p>`);
    });
    if (list) out.push(`<ul>${list.join('')}</ul>`);
    return out.join('\n').replace(/\u0000(\d+)\u0000/g, (_, i) => `<pre><code>${esc(codes[+i])}</code></pre>`);
  }

  /* ---- heuristic checker for hands-on tasks: compares the candidate's YAML/commands with the reference solution.
     Not a cluster: it checks that the fields/values and command tokens of the reference appear in your answer. */
  const YAML = window.jsyaml || null;
  const CMD_RE = /^(kubectl|k|helm|etcdctl|kubeadm|systemctl|journalctl|crictl|openssl|sudo|kubens|kubectx|terraform|tofu|vault|consul)\b/;
  const IGNORE_KEYS = new Set(['status', 'creationTimestamp', 'resourceVersion', 'uid', 'selfLink', 'generation', 'managedFields', 'annotations']);
  const CMD_STOP = new Set(['kubectl', 'k', 'sudo', '--dry-run=client', '-o', 'yaml', '-oyaml', '>', '>>', '|', '&&', ';', 'apply', '-f', 'create', 'get', 'describe', 'run', 'exec', '--', 'echo', 'cat', 'vi', 'vim', 'nano']);

  // Split shell text into (heredoc YAML docs, command lines). Handles `cat <<EOF | k apply -f -` ... `EOF` and `\` continuations.
  function splitShell(text) {
    const yamlDocs = [], cmdLines = [];
    const lines = text.split('\n');
    let i = 0;
    while (i < lines.length) {
      let l = lines[i];
      const hd = l.match(/<<-?\s*['"]?(\w+)['"]?/);
      if (hd) {
        const marker = hd[1]; const buf = []; i++;
        while (i < lines.length && lines[i].trim() !== marker) { buf.push(lines[i]); i++; }
        yamlDocs.push(...splitYamlDocs(buf.join('\n')));
        cmdLines.push(l.replace(/<<-?\s*['"]?\w+['"]?/, '').trim());
        i++; continue;
      }
      while (l.trimEnd().endsWith('\\') && i + 1 < lines.length) { i++; l = l.trimEnd().slice(0, -1) + ' ' + lines[i].trim(); }
      cmdLines.push(l); i++;
    }
    return { yamlDocs, cmds: commandLines(cmdLines.join('\n')) };
  }
  function extractSolutionBlocks(md) {
    const yamlDocs = [], cmds = [];
    const re = /```([\w-]*)[ \t]*\n([\s\S]*?)```/g; let m;
    while ((m = re.exec(md))) {
      const lang = m[1].toLowerCase(), body = m[2];
      const isYaml = lang === 'yaml' || lang === 'yml' || (!/<<-?\s*['"]?\w+/.test(body) && !CMD_RE.test(body.trim()) && /^\s*(apiVersion|kind):/m.test(body));
      if (isYaml) yamlDocs.push(...splitYamlDocs(body));
      else { const sh = splitShell(body); yamlDocs.push(...sh.yamlDocs); cmds.push(...sh.cmds); }
    }
    if (!yamlDocs.length && !cmds.length) cmds.push(...commandLines(md));   // solutions written as plain text
    return { yamlDocs, cmds };
  }
  function splitYamlDocs(text) { return text.split(/^---\s*$/m).map((x) => x.trim()).filter((x) => /:\s/.test(x) || /:$/m.test(x)); }
  function commandLines(text) {
    return text.split('\n').map((l) => l.replace(/^\s*\$\s*/, '').trim()).filter((l) => l && !l.startsWith('#') && CMD_RE.test(l));
  }
  function parseCandidate(text) {
    // Candidate text: YAML documents mixed with command lines (and possibly heredocs, like on the exam terminal).
    const sh = splitShell(text);
    const yamlLines = [];
    let i = 0; const lines = text.split('\n');
    while (i < lines.length) {
      const l = lines[i];
      const hd = l.match(/<<-?\s*['"]?(\w+)['"]?/);
      if (hd) { const marker = hd[1]; i++; while (i < lines.length && lines[i].trim() !== marker) i++; i++; continue; }
      const t = l.trim().replace(/^\$\s*/, '');
      if (!CMD_RE.test(t) && !t.startsWith('#')) yamlLines.push(l);
      i++;
    }
    return { yamlDocs: [...sh.yamlDocs, ...splitYamlDocs(yamlLines.join('\n'))], cmds: sh.cmds };
  }
  function flatten(obj, prefix, out) {
    if (obj === null || obj === undefined) return out;
    if (Array.isArray(obj)) { obj.forEach((v) => flatten(v, prefix + '[]', out)); return out; }
    if (typeof obj === 'object') {
      Object.keys(obj).forEach((k) => { if (IGNORE_KEYS.has(k)) return; const v = obj[k]; if (v && typeof v === 'object' && !Object.keys(v).length) return; flatten(v, prefix ? `${prefix}.${k}` : k, out); });
      return out;
    }
    out.push(`${prefix}=${String(obj).trim().toLowerCase()}`);
    return out;
  }
  function normCmd(c) {
    return c.replace(/^k\b/, 'kubectl').replace(/--namespace[= ]/g, '-n ').replace(/--replicas[= ]/g, '--replicas=').replace(/--image[= ]/g, '--image=')
      .replace(/\s+/g, ' ').trim();
  }
  function cmdTokens(c) { return normCmd(c).split(' ').filter((t) => t && !CMD_STOP.has(t) && !/^[\w.-]+\.(ya?ml|json|txt|sh)$/.test(t)); }

  // Local kubectl helper (tools/lab_server.py). Same origin when the helper serves the app; otherwise 127.0.0.1:8766.
  let LAB_HELPER = load('ccp.labHelperUrl', null) || 'http://127.0.0.1:8766';
  const LS_HELPER = 'ccp.labHelper';
  let helperEnabled = !!load(LS_HELPER, false);
  async function probeOne(base) {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 2500);
    try { const r = await fetch(base + '/health', { signal: ctl.signal }); const j = await r.json(); return j && j.helper === 'lab_server' ? j : null; }
    catch { return null; } finally { clearTimeout(t); }
  }
  // Same origin first (the helper can serve the app itself), then the default loopback port.
  async function probeHelper() {
    const candidates = [...new Set([/^https?:$/.test(location.protocol) ? location.origin : null, 'http://127.0.0.1:8766'].filter(Boolean))];
    for (const base of candidates) { const h = await probeOne(base); if (h) { LAB_HELPER = base; save('ccp.labHelperUrl', base); return h; } }
    return null;
  }
  function helperHelpHtml() {
    const hosted = location.protocol === 'https:';
    return `<strong>Local kubectl helper not reachable</strong> at <code>${esc(LAB_HELPER)}</code>.
      <ol class="help-steps">
        <li>You need a cluster on this machine (kind, minikube, k3d) and <code>kubectl</code> pointing at it.</li>
        <li>Start the helper from the project folder: <pre><code>python3 tools/lab_server.py</code></pre></li>
        ${hosted ? `<li>This copy is hosted on <code>${esc(location.host)}</code> (https). Chrome will ask for <em>local network access</em> permission when the page calls 127.0.0.1; allow it. Safari and Firefox may block it, in which case open the app from the helper itself: <code>http://127.0.0.1:8766/</code>.</li>` : `<li>Or simply open the app through the helper: <code>http://127.0.0.1:8766/</code> (same origin, no browser permission needed).</li>`}
      </ol>`;
  }
  async function kubectlDryRun(text) {
    const r = await fetch(LAB_HELPER + '/dry-run', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: text });
    return r.json();
  }

  function checkLabAnswer(answerText, solutionMd) {
    const res = { checkable: false, yaml: [], cmds: [], matched: 0, total: 0, errors: [] };
    const sol = extractSolutionBlocks(solutionMd);
    const cand = parseCandidate(answerText || '');
    let candDocs = [];
    if (YAML) {
      cand.yamlDocs.forEach((d, i) => { try { const o = YAML.load(d); if (o && typeof o === 'object') candDocs.push({ obj: o, leaves: new Set(flatten(o, '', [])) }); } catch (e) { res.errors.push(`YAML doc ${i + 1}: ${e.message.split('\n')[0]}`); } });
      sol.yamlDocs.forEach((d) => {
        let o; try { o = YAML.load(d); } catch { return; }
        if (!o || typeof o !== 'object') return;
        const leaves = flatten(o, '', []);
        if (!leaves.length) return;
        res.checkable = true;
        let best = { hit: 0, missing: leaves };
        candDocs.forEach((c) => { const missing = leaves.filter((l) => !c.leaves.has(l)); if (leaves.length - missing.length > best.hit) best = { hit: leaves.length - missing.length, missing }; });
        res.yaml.push({ kind: `${o.kind || 'doc'}${o.metadata && o.metadata.name ? ' ' + o.metadata.name : ''}`, hit: best.hit, total: leaves.length, missing: best.missing });
        res.matched += best.hit; res.total += leaves.length;
      });
    }
    const candCmdText = ' ' + cand.cmds.map(normCmd).join(' ; ') + ' ';
    sol.cmds.forEach((c) => {
      const toks = cmdTokens(c); if (!toks.length) return;
      res.checkable = true;
      const missing = toks.filter((t) => !candCmdText.includes(' ' + t + ' ') && !candCmdText.includes(t));
      res.cmds.push({ cmd: normCmd(c), hit: toks.length - missing.length, total: toks.length, missing });
      res.matched += toks.length - missing.length; res.total += toks.length;
    });
    res.pct = res.total ? Math.round((res.matched / res.total) * 100) : 0;
    res.suggested = res.pct >= 75 ? 1 : res.pct >= 40 ? 0.5 : 0;
    return res;
  }

  /* ---- in-browser Kubernetes simulation (ngrok/webernetes, Apache-2.0, vendored in vendor/webernetes.js).
     Applies your manifests to a simulated 3-node cluster and reports what actually happens: scheduling, readiness,
     replicas, service routing, API validation errors. Supported kinds: Namespace, Pod, Deployment, ReplicaSet, Service. */
  const W8S_KINDS = new Set(['Namespace', 'Pod', 'Deployment', 'ReplicaSet', 'Service', 'Node']);
  let w8sModule = null;
  async function loadW8s() {
    if (w8sModule) return w8sModule;
    if (location.protocol === 'file:') throw new Error('The browser cluster needs the app served over http (e.g. `python3 -m http.server 8080`), file:// blocks module loading.');
    w8sModule = await import('./vendor/webernetes.js');
    return w8sModule;
  }
  function yamlDocsToObjects(text) {
    const docs = [], errors = [];
    (parseCandidate(text).yamlDocs).forEach((d, i) => {
      try { YAML.loadAll(d).forEach((o) => { if (o && typeof o === 'object' && o.kind) docs.push(o); }); }
      catch (e) { errors.push(`YAML doc ${i + 1}: ${e.message.split('\n')[0]}`); }
    });
    return { docs, errors };
  }
  function imagesIn(docs) {
    const out = new Set();
    const walk = (o) => { if (!o || typeof o !== 'object') return; if (Array.isArray(o)) return o.forEach(walk);
      if (typeof o.image === 'string') out.add(o.image); Object.values(o).forEach(walk); };
    docs.forEach(walk);
    return [...out];
  }
  function portsIn(docs) {
    const out = new Set([80, 8080]);
    const walk = (o) => { if (!o || typeof o !== 'object') return; if (Array.isArray(o)) return o.forEach(walk);
      if (typeof o.containerPort === 'number') out.add(o.containerPort); Object.values(o).forEach(walk); };
    docs.forEach(walk);
    return [...out];
  }
  function apiErrorMessage(e) {
    const m = String(e && e.message || e);
    const bm = m.match(/"message":"((?:[^"\\]|\\.)*)"/);
    return bm ? bm[1].replace(/\\"/g, '"') : m.split('\n')[0];
  }
  async function runInBrowserCluster(docs) {
    const { Cluster, BaseImage } = await loadW8s();
    const cluster = new Cluster();
    const ports = portsIn(docs);
    imagesIn(docs).forEach((img) => {
      const [name, version] = img.includes(':') ? [img.slice(0, img.lastIndexOf(':')), img.slice(img.lastIndexOf(':') + 1)] : [img, 'latest'];
      cluster.registerImage(class extends BaseImage {
        static imageName = name; static imageVersion = version;
        defaultCommand = ['server'];
        async exec(ctx) { ports.forEach((p) => { try { ctx.listenHttp(p, async () => ({ status: 200, body: `ok from ${ctx.env.get('HOSTNAME') || name}\n` })); } catch { /* port in use */ } }); return ctx.waitUntilKilled(); }
      });
    });
    const report = { applied: [], pods: [], deployments: [], services: [], warnings: [], unsupported: [] };
    await cluster.init();
    const order = (o) => (o.kind === 'Namespace' ? 0 : o.kind === 'Service' ? 2 : 1);
    const pods = new Map(), deps = new Map(), slices = new Map();
    const informers = [
      cluster.informer('pods', (t, p) => { if (p.metadata.namespace === 'kube-system') return; const k = `${p.metadata.namespace}/${p.metadata.name}`; if (t === 'delete') pods.delete(k); else pods.set(k, p); }),
      cluster.informer('deployments', (t, d) => { if (d.metadata.namespace === 'kube-system') return; const k = `${d.metadata.namespace}/${d.metadata.name}`; if (t === 'delete') deps.delete(k); else deps.set(k, d); }),
      cluster.informer('endpointslices', (t, es) => { const svc = es.metadata.labels && es.metadata.labels['kubernetes.io/service-name']; if (!svc) return; const k = `${es.metadata.namespace}/${svc}`; slices.set(k, (es.endpoints || []).length); }),
      cluster.informer('events', (t, ev) => { if (ev.type === 'Warning' && ev.involvedObject && ev.involvedObject.namespace !== 'kube-system') report.warnings.push(`${ev.involvedObject.kind}/${ev.involvedObject.name}: ${ev.reason} - ${ev.message}`); }),
    ];
    try {
      for (const o of docs.slice().sort((a, b) => order(a) - order(b))) {
        const label = `${o.kind}/${(o.metadata && o.metadata.name) || '?'}${o.metadata && o.metadata.namespace ? ` (ns ${o.metadata.namespace})` : ''}`;
        if (!W8S_KINDS.has(o.kind)) { report.unsupported.push(label); continue; }
        try { await cluster.apply([o]); report.applied.push({ label, ok: true }); }
        catch (e) { report.applied.push({ label, ok: false, error: apiErrorMessage(e) }); }
      }
      // let controllers, scheduler and probes run (the simulation uses a virtual clock driven by real time)
      const t0 = Date.now();
      const wanted = docs.filter((o) => o.kind === 'Deployment').reduce((n, d) => n + ((d.spec && d.spec.replicas) || 1), 0) + docs.filter((o) => o.kind === 'Pod').length;
      const readyCount = () => [...pods.values()].filter((p) => (p.status && p.status.conditions || []).some((c) => c.type === 'Ready' && c.status === 'True')).length;
      while (Date.now() - t0 < 6000 && (wanted === 0 ? Date.now() - t0 < 800 : readyCount() < wanted)) await new Promise((r) => setTimeout(r, 150));
      await new Promise((r) => setTimeout(r, 300));
      pods.forEach((p) => report.pods.push({
        name: p.metadata.name, ns: p.metadata.namespace, phase: p.status && p.status.phase, node: p.spec && p.spec.nodeName,
        ready: (p.status && p.status.conditions || []).some((c) => c.type === 'Ready' && c.status === 'True'),
        restarts: (p.status && p.status.containerStatuses || []).reduce((n, c) => n + (c.restartCount || 0), 0),
        images: (p.spec.containers || []).map((c) => c.image),
      }));
      deps.forEach((d) => report.deployments.push({ name: d.metadata.name, ns: d.metadata.namespace, replicas: (d.spec && d.spec.replicas) || 1, ready: (d.status && d.status.readyReplicas) || 0, strategy: d.spec && d.spec.strategy && d.spec.strategy.type }));
      for (const o of docs.filter((x) => x.kind === 'Service')) {
        const ns = (o.metadata && o.metadata.namespace) || 'default';
        const svc = { name: o.metadata.name, ns, type: (o.spec && o.spec.type) || 'ClusterIP', endpoints: slices.get(`${ns}/${o.metadata.name}`) || 0, probe: null };
        const np = (o.spec && o.spec.ports || []).find((p) => p.nodePort);
        if (np) { try { const r = await cluster.fetch(`http://node-1:${np.nodePort}/`); svc.probe = `NodePort ${np.nodePort} → HTTP ${r.status}`; } catch (e) { svc.probe = `NodePort ${np.nodePort} → ${apiErrorMessage(e)}`; } }
        else if (svc.endpoints) { try { const r = await cluster.fetch(`http://${o.metadata.name}.${ns}.svc.cluster.local:${(o.spec.ports || [{ port: 80 }])[0].port}/`); svc.probe = `ClusterIP DNS → HTTP ${r.status}`; } catch (e) { svc.probe = `ClusterIP DNS → ${apiErrorMessage(e)}`; } }
        report.services.push(svc);
      }
    } finally {
      informers.forEach((i) => { try { i.stop && i.stop(); } catch { /* ignore */ } });
      try { await cluster.close(); } catch { /* ignore */ }
    }
    return report;
  }
  function inventory(docs) {
    // What the manifests declare, normalised for comparing candidate vs reference.
    return docs.filter((o) => W8S_KINDS.has(o.kind) && o.metadata && o.metadata.name).map((o) => {
      const ns = o.metadata.namespace || 'default';
      const spec = o.spec || {};
      const tpl = spec.template && spec.template.spec ? spec.template.spec : spec;
      const facts = { kind: o.kind, name: o.metadata.name, ns };
      if (o.kind === 'Deployment' || o.kind === 'ReplicaSet') facts.replicas = spec.replicas == null ? 1 : spec.replicas;
      if (tpl.containers) facts.images = tpl.containers.map((c) => c.image).sort();
      if (o.kind === 'Service') { facts.type = spec.type || 'ClusterIP'; facts.ports = (spec.ports || []).map((p) => `${p.port}→${p.targetPort || p.port}${p.nodePort ? `:${p.nodePort}` : ''}`).sort(); facts.selector = JSON.stringify(spec.selector || {}); }
      if (o.metadata.labels) facts.labels = JSON.stringify(o.metadata.labels);
      return facts;
    });
  }
  function diffInventory(mine, ref) {
    const key = (f) => `${f.kind}/${f.ns}/${f.name}`;
    const mineMap = new Map(mine.map((f) => [key(f), f]));
    const out = { missing: [], mismatched: [] };
    ref.forEach((r) => {
      const m = mineMap.get(key(r));
      if (!m) { out.missing.push(key(r)); return; }
      ['replicas', 'images', 'type', 'ports', 'selector'].forEach((k) => {
        if (r[k] === undefined) return;
        if (JSON.stringify(r[k]) !== JSON.stringify(m[k])) out.mismatched.push(`${key(r)} ${k}: yours ${JSON.stringify(m[k])} · reference ${JSON.stringify(r[k])}`);
      });
    });
    return out;
  }
  function renderClusterReport(rep, diff, refHasManifests, yamlErrors) {
    const div = document.createElement('div');
    const allApplied = rep.applied.length && rep.applied.every((a) => a.ok);
    const podsOk = rep.pods.length ? rep.pods.every((p) => p.ready) : rep.applied.some((a) => a.ok);
    const depsOk = rep.deployments.every((d) => d.ready >= d.replicas);
    const svcOk = rep.services.every((s) => s.endpoints > 0 && (!s.probe || / 200$/.test(s.probe)));
    const diffOk = !diff || (!diff.missing.length && !diff.mismatched.length);
    const cls = allApplied && podsOk && depsOk && svcOk && diffOk ? 'ok' : allApplied && podsOk ? 'warn' : 'bad';
    const li = (x) => `<li>${x}</li>`;
    div.className = `check-result cluster-report check-${cls}`;
    div.innerHTML = `<div class="check-head"><strong>Browser cluster run</strong> (webernetes, simulated 3-node cluster)</div>
      ${yamlErrors.length ? `<div class="check-errors">${yamlErrors.map(esc).join('<br>')}</div>` : ''}
      <ul>${rep.applied.map((a) => li(`${a.ok ? '✔' : '✘'} <code>${esc(a.label)}</code>${a.ok ? ' applied' : ` rejected: ${esc(a.error)}`}`)).join('')}
      ${rep.unsupported.map((u) => li(`⚪ <code>${esc(u)}</code> not simulated (unsupported kind)`)).join('')}</ul>
      ${rep.pods.length ? `<div class="rep-title">Pods</div><ul>${rep.pods.map((p) => li(`${p.ready ? '✔' : '✘'} <code>${esc(p.ns)}/${esc(p.name)}</code> ${esc(p.phase || '?')}${p.ready ? ', Ready' : ', not Ready'} on ${esc(p.node || '-')}${p.restarts ? `, restarts ${p.restarts}` : ''} · ${p.images.map(esc).join(', ')}`)).join('')}</ul>` : ''}
      ${rep.deployments.length ? `<div class="rep-title">Deployments</div><ul>${rep.deployments.map((d) => li(`${d.ready >= d.replicas ? '✔' : '✘'} <code>${esc(d.ns)}/${esc(d.name)}</code> ${d.ready}/${d.replicas} ready${d.strategy ? `, ${esc(d.strategy)}` : ''}`)).join('')}</ul>` : ''}
      ${rep.services.length ? `<div class="rep-title">Services</div><ul>${rep.services.map((s) => li(`${s.endpoints > 0 ? '✔' : '✘'} <code>${esc(s.ns)}/${esc(s.name)}</code> ${esc(s.type)}, ${s.endpoints} endpoint${s.endpoints === 1 ? '' : 's'}${s.probe ? ` · ${esc(s.probe)}` : ''}`)).join('')}</ul>` : ''}
      ${rep.warnings.length ? `<div class="rep-title">Warning events</div><ul>${[...new Set(rep.warnings)].slice(0, 8).map((w) => li(esc(w))).join('')}</ul>` : ''}
      ${diff ? `<div class="rep-title">Versus the reference solution's manifests</div>${diff.missing.length || diff.mismatched.length
        ? `<ul>${diff.missing.map((m) => li(`✘ missing <code>${esc(m)}</code>`)).join('')}${diff.mismatched.map((m) => li(`✘ ${esc(m)}`)).join('')}</ul>`
        : '<ul><li>✔ same objects, replicas, images, service ports and selectors</li></ul>'}` : (refHasManifests ? '' : '<div class="muted small">The reference solution has no YAML manifests (kubectl-only), so only the behaviour of your manifests is reported.</div>')}
      <div class="muted small">Simulation limits: no volumes, ConfigMaps/Secrets, RBAC, NetworkPolicy, resources, affinity or real images (any image name starts a stub HTTP server). Readiness comes from the simulated kubelet and probes.</div>`;
    return div;
  }
  const LAB_GRADES = [['1', 'Solved', 'ok'], ['0.5', 'Partially', 'warn'], ['0', 'Not solved', 'bad']];

  /* ------------------------------------------------------------------ migration from the single-exam v1 storage */
  (function migrateV1() {
    const h1 = load('ccp.history.v1', null);
    if (h1) {
      const h2 = load(LS_HISTORY, []);
      h1.forEach((h) => h2.push({ ...h, exam: 'CLF-C02', wrongIds: (h.wrongIds || []).map((id) => 'kn:' + id) }));
      h2.sort((a, b) => b.at - a.at);
      save(LS_HISTORY, h2); save('ccp.history.v1', null);
    }
    const w1 = load('ccp.wrongIds.v1', null);
    if (w1) {
      const w2 = load(LS_WRONG, {});
      w2['CLF-C02'] = [...new Set([...(w2['CLF-C02'] || []), ...w1.map((id) => 'kn:' + id)])];
      save(LS_WRONG, w2); save('ccp.wrongIds.v1', null);
    }
    save('ccp.session.v1', null);
  })();

  /* ------------------------------------------------------------------ bank loading (lazy <script> injection, works over file://) */
  const bankPromises = {};
  function loadBank(code) {
    window.QUESTION_BANKS = window.QUESTION_BANKS || {};
    if (window.QUESTION_BANKS[code]) return Promise.resolve(window.QUESTION_BANKS[code]);
    if (bankPromises[code]) return bankPromises[code];
    bankPromises[code] = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = EXAMS[code].file;
      s.onload = () => window.QUESTION_BANKS[code] ? resolve(window.QUESTION_BANKS[code]) : reject(new Error('bank empty'));
      s.onerror = () => reject(new Error(`could not load ${EXAMS[code].file}`));
      document.head.appendChild(s);
    }).catch((e) => { delete bankPromises[code]; throw e; });
    return bankPromises[code];
  }
  function setBusy(on) { document.body.classList.toggle('busy', on); }

  /* ------------------------------------------------------------------ theme */
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
  }
  applyTheme(load(LS_THEME, null));
  $('theme-toggle').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effective = cur || (prefersDark ? 'dark' : 'light');
    const next = effective === 'dark' ? 'light' : 'dark';
    applyTheme(next); save(LS_THEME, next);
  });

  /* ------------------------------------------------------------------ views */
  function show(name) {
    Object.entries(views).forEach(([k, el]) => el.classList.toggle('hidden', k !== name));
    $('exam-status').classList.toggle('hidden', name !== 'exam');
    window.scrollTo({ top: 0 });
  }

  /* ------------------------------------------------------------------ session building */
  function buildItems(questions, shuffleOptions) {
    return questions.map((q) => {
      if (q.kind === 'lab') {
        return { id: q.id, kind: 'lab', q: q.task, solution: q.solution, weight: q.weight || null, sources: q.sources,
                 options: [], correct: [], multi: false, selected: [], flagged: false, checked: false, revealed: false, grade: null, answerText: '', check: null };
      }
      const opts = shuffleOptions ? shuffle(q.options) : q.options;
      const letters = 'ABCDEFG';
      // Re-letter options so the displayed keys are always A, B, C… ; keep the original key to score.
      const options = opts.map((o, i) => ({ key: letters[i], text: o.t, orig: o.k }));
      const correct = options.filter((o) => q.answer.includes(o.orig)).map((o) => o.key);
      return { id: q.id, q: q.q, img: q.img || null, options, correct, multi: q.multi, explanation: q.explanation, sources: q.sources,
               disputed: q.disputed || null, selected: [], flagged: false, checked: false };
    });
  }

  async function startExam() {
    const meta = EXAMS[currentExam];
    setBusy(true);
    let bank;
    try { bank = await loadBank(currentExam); } catch (e) { setBusy(false); openModal('Could not load questions', esc(e.message), null); return; }
    setBusy(false);
    const count = clampInt($('opt-count').value, 10, bank.length, meta.questions);
    const minutes = clampInt($('opt-minutes').value, 5, 300, meta.minutes);
    const unscored = meta.kind === 'lab' ? 0 : clampInt($('opt-unscored').value, 0, count - 1, meta.unscored);
    const items = buildItems(sample(bank, count), $('opt-shuffle').checked);
    session = {
      mode: 'exam', exam: currentExam, items, idx: 0, unscoredCount: unscored, passScaled: meta.pass, scoring: meta.scoring || 'scaled', passPct: meta.passPct || null,
      durationSec: minutes * 60, startedAt: Date.now(), pausedAccum: 0, pausedAt: null,
      allowPause: $('opt-pause').checked, finished: false,
    };
    persistSession();
    enterExam();
  }

  async function startPractice(customIds) {
    setBusy(true);
    let bank;
    try { bank = await loadBank(currentExam); } catch (e) { setBusy(false); openModal('Could not load questions', esc(e.message), null); return; }
    setBusy(false);
    let pool = bank;
    if (customIds) {
      const set = new Set(customIds); pool = bank.filter((q) => set.has(q.id));
    } else {
      const src = $('prac-source').value;           // "all" | "kn" | "kn:14" | "dt" ...
      if (src !== 'all') {
        pool = pool.filter((q) => q.sources.some((s) => src.includes(':') ? s.startsWith(src + '-') : s.startsWith(src + ':')));
      }
      if ($('prac-wrong-only').checked) {
        const wrong = new Set(wrongPool(currentExam));
        pool = pool.filter((q) => wrong.has(q.id));
      }
    }
    if (!pool.length) { openModal('Nothing to practice', 'No questions match that filter yet.', null); return; }
    const count = customIds ? pool.length : clampInt($('prac-count').value, 1, pool.length, 30);
    const items = buildItems(sample(pool, count), true);
    session = { mode: 'practice', exam: currentExam, items, idx: 0, unscoredCount: 0, passScaled: EXAMS[currentExam].pass, scoring: EXAMS[currentExam].scoring || 'scaled', passPct: EXAMS[currentExam].passPct || null, durationSec: 0,
                startedAt: Date.now(), pausedAccum: 0, pausedAt: null, allowPause: false, finished: false };
    persistSession();
    enterExam();
  }

  function persistSession() { save(LS_SESSION, session && !session.finished ? session : null); }

  /* ------------------------------------------------------------------ exam view */
  function enterExam() {
    show('exam');
    const isExam = session.mode === 'exam';
    $('exam-code-pill').textContent = session.exam;
    $('btn-pause').classList.toggle('hidden', !(isExam && session.allowPause));
    $('btn-check').classList.toggle('hidden', isExam);
    $('btn-finish').textContent = isExam ? 'Finish exam' : 'Finish practice';
    renderNavGrid();
    renderQuestion();
    startTimer();
  }

  function elapsedSec() {
    const pausedNow = session.pausedAt ? Date.now() - session.pausedAt : 0;
    return (Date.now() - session.startedAt - session.pausedAccum - pausedNow) / 1000;
  }
  function remainingSec() { return session.durationSec - elapsedSec(); }

  function startTimer() {
    stopTimer();
    tick();
    tickHandle = setInterval(tick, 250);
  }
  function stopTimer() { if (tickHandle) { clearInterval(tickHandle); tickHandle = null; } }
  function tick() {
    if (!session || session.finished) return;
    const t = $('timer');
    if (session.mode === 'exam') {
      const rem = remainingSec();
      t.textContent = fmtClock(rem);
      t.classList.toggle('warn', rem <= 600 && rem > 300);
      t.classList.toggle('danger', rem <= 300);
      if (rem <= 0) { finish(true); }
    } else {
      t.textContent = fmtClock(elapsedSec());
      t.classList.remove('warn', 'danger');
    }
  }

  function renderQuestion() {
    const it = session.items[session.idx];
    const n = session.idx + 1, total = session.items.length;
    $('progress-label').textContent = `Q ${n} / ${total}`;
    $('q-number').textContent = it.kind === 'lab' ? `Task ${n}` : `Question ${n}`;
    $('q-type').textContent = it.kind === 'lab' ? (it.weight ? `Hands-on · weight ${it.weight}%` : 'Hands-on task') : it.multi ? `Choose ${it.correct.length}` : 'Single choice';
    $('q-source').textContent = sourcesLabel(it);
    const qt = $('q-text');
    if (it.kind === 'lab') { qt.innerHTML = mdLite(it.q); qt.classList.add('md'); } else { qt.textContent = it.q; qt.classList.remove('md'); }
    const img = $('q-img');
    if (it.img) { img.src = it.img; img.classList.remove('hidden'); } else { img.removeAttribute('src'); img.classList.add('hidden'); }
    $('btn-flag').classList.toggle('active', it.flagged);
    $('btn-flag').textContent = it.flagged ? '⚑ Flagged' : '⚑ Flag';

    const box = $('q-options');
    box.innerHTML = '';
    const fb = $('q-feedback');
    if (it.kind === 'lab') {
      renderLabControls(it, box, fb);
    } else {
      const reveal = session.mode === 'practice' && it.checked;
      it.options.forEach((o) => {
        const div = document.createElement('div');
        div.className = 'option';
        div.setAttribute('role', it.multi ? 'checkbox' : 'radio');
        div.dataset.key = o.key;
        if (it.selected.includes(o.key)) div.classList.add('selected');
        if (reveal) {
          div.classList.add('locked');
          const isCorrect = it.correct.includes(o.key), isSel = it.selected.includes(o.key);
          if (isCorrect && isSel) div.classList.add('correct');
          else if (isCorrect) div.classList.add('missed');
          else if (isSel) div.classList.add('wrong');
        }
        div.innerHTML = `<span class="key">${o.key}</span><span class="txt">${esc(o.text)}</span>`;
        if (!reveal) div.addEventListener('click', () => select(o.key));
        box.appendChild(div);
      });
      if (reveal) {
        const ok = sameSet(it.selected, it.correct);
        fb.className = 'feedback ' + (ok ? 'ok' : 'bad');
        fb.innerHTML = `<div>${ok ? '✔ Correct.' : `✘ Incorrect. Correct answer: ${it.correct.join(', ')}.`}</div>` + explanationHtml(it.explanation) + disputedHtml(it);
      } else {
        fb.className = 'feedback hidden';
      }
    }

    $('btn-prev').disabled = session.idx === 0;
    const last = session.idx === total - 1;
    $('btn-next').classList.toggle('hidden', last);
    $('btn-finish').classList.toggle('hidden', !last);
    $('btn-check').classList.toggle('hidden', session.mode === 'exam' || it.kind === 'lab');
    if (session.mode === 'practice' && it.kind !== 'lab') {
      $('btn-check').disabled = it.checked || it.selected.length === 0;
      $('btn-check').textContent = it.checked ? 'Checked' : 'Check answer';
    }
    updateNavCell(session.idx);
    document.querySelectorAll('.nav-cell.current').forEach((c) => c.classList.remove('current'));
    const cell = document.querySelector(`.nav-cell[data-idx="${session.idx}"]`);
    if (cell) { cell.classList.add('current'); cell.scrollIntoView({ block: 'nearest' }); }
    updateNavSummary();
  }

  // Lab task: write your YAML / kubectl commands, get a heuristic check against the reference solution, then grade yourself.
  function renderLabControls(it, box, fb) {
    const isK8s = (EXAMS[session.exam] || {}).vendor === 'Kubernetes';
    const wrap = document.createElement('div');
    wrap.className = 'lab-controls';
    const editor = document.createElement('div');
    editor.className = 'lab-editor';
    editor.innerHTML = `<label class="lab-editor-label" for="lab-answer">Your answer <span class="muted">${isK8s ? '(YAML manifests and/or kubectl commands, <code>---</code> between documents)' : '(HCL / commands; the check compares tokens with the reference)'}</span></label>
      <textarea id="lab-answer" spellcheck="false" placeholder="${isK8s ? 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: web-pod\n...\n\nkubectl apply -f web-pod.yaml' : 'resource \"terraform_data\" \"env\" {\n  for_each = local.environments\n  ...\n}\n\nterraform init && terraform plan'}"></textarea>
      <div class="lab-editor-actions">
        <button type="button" class="btn btn-secondary" id="btn-check-lab">Check my answer</button>
        ${isK8s ? `<button type="button" class="btn btn-ghost" id="btn-w8s" title="Applies your YAML to a Kubernetes cluster simulated in this browser tab (ngrok/webernetes) and reports pods, replicas and service routing">Run in browser cluster</button>
        <button type="button" class="btn btn-ghost${helperEnabled ? '' : ' hidden'}" id="btn-dryrun" title="Runs kubectl apply --dry-run=server on your YAML via the local helper (tools/lab_server.py) against your current kube context">kubectl dry-run</button>
        <button type="button" class="btn btn-ghost btn-sm${helperEnabled ? ' hidden' : ''}" id="btn-enable-helper" title="Have kind/minikube on this machine? Start tools/lab_server.py and enable real kubectl validation">＋ enable kubectl dry-run</button>` : ''}
        <button type="button" class="btn btn-ghost" id="btn-reveal">${it.revealed ? 'Solution shown below' : 'Reveal solution'}</button>
        <span class="muted small">Heuristic check against the reference solution, not a real cluster. Use <kbd>Tab</kbd> for two spaces.</span>
      </div>`;
    const ta = editor.querySelector('textarea');
    ta.value = it.answerText || '';
    ta.addEventListener('input', () => { it.answerText = ta.value; persistSession(); });
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') { e.preventDefault(); const st = ta.selectionStart, en = ta.selectionEnd; ta.value = ta.value.slice(0, st) + '  ' + ta.value.slice(en); ta.selectionStart = ta.selectionEnd = st + 2; it.answerText = ta.value; persistSession(); }
      e.stopPropagation();
    });
    editor.querySelector('#btn-check-lab').addEventListener('click', () => {
      it.answerText = ta.value;
      it.check = checkLabAnswer(it.answerText, it.solution);
      it.revealed = true;
      if (it.check.checkable && !it.gradeManual) { it.grade = it.check.suggested; it.selected = ['graded']; it.checked = true; }
      persistSession(); renderQuestion();
    });
    editor.querySelector('#btn-reveal').addEventListener('click', () => { it.revealed = true; persistSession(); renderQuestion(); });
    if (isK8s) editor.querySelector('#btn-w8s').addEventListener('click', async () => {
      it.answerText = ta.value; persistSession();
      const holder = editor.querySelector('.cluster-report-holder') || editor.appendChild(Object.assign(document.createElement('div'), { className: 'cluster-report-holder' }));
      holder.innerHTML = '<div class="check-result check-na">Booting the browser cluster and applying your manifests …</div>';
      try {
        const mine = yamlDocsToObjects(it.answerText);
        if (!mine.docs.length) { holder.innerHTML = `<div class="check-result check-na">No YAML manifests found in your answer${mine.errors.length ? `<div class="check-errors">${mine.errors.map(esc).join('<br>')}</div>` : ''}. kubectl commands cannot run in the simulation, only manifests.</div>`; return; }
        const ref = { docs: [] };
        extractSolutionBlocks(it.solution).yamlDocs.forEach((d) => { try { YAML.loadAll(d).forEach((o) => { if (o && typeof o === 'object' && o.kind) ref.docs.push(o); }); } catch { /* reference snippet not valid YAML */ } });
        const rep = await runInBrowserCluster(mine.docs);
        const refInv = inventory(ref.docs);
        const diff = refInv.length ? diffInventory(inventory(mine.docs), refInv) : null;
        it.clusterRun = { ok: rep.applied.every((a) => a.ok) && rep.pods.every((p) => p.ready), diffOk: !diff || (!diff.missing.length && !diff.mismatched.length) };
        persistSession();
        holder.innerHTML = ''; holder.appendChild(renderClusterReport(rep, diff, refInv.length > 0, mine.errors));
      } catch (e) {
        holder.innerHTML = `<div class="check-result check-bad"><strong>Browser cluster failed:</strong> ${esc(e.message)}</div>`;
      }
    });
    const dryBox = () => editor.querySelector('.dryrun-result') || editor.appendChild(Object.assign(document.createElement('div'), { className: 'dryrun-result check-result check-na' }));
    if (isK8s) editor.querySelector('#btn-enable-helper').addEventListener('click', async () => {
      const box2 = dryBox(); box2.className = 'dryrun-result check-result check-na'; box2.textContent = `Looking for the local helper at ${LAB_HELPER} …`;
      const h = await probeHelper();
      if (h) {
        helperEnabled = true; save(LS_HELPER, true);
        editor.querySelector('#btn-dryrun').classList.remove('hidden'); editor.querySelector('#btn-enable-helper').classList.add('hidden');
        box2.className = 'dryrun-result check-result check-ok'; box2.innerHTML = `<strong>Helper found</strong>, kube context <code>${esc(h.context || '?')}</code>. The kubectl dry-run button is now enabled.`;
      }
      else { box2.innerHTML = helperHelpHtml(); }
    });
    if (isK8s) editor.querySelector('#btn-dryrun').addEventListener('click', async () => {
      it.answerText = ta.value; persistSession();
      const box2 = dryBox();
      box2.className = 'dryrun-result check-result check-na'; box2.textContent = 'Running kubectl apply --dry-run=server …';
      try {
        const r = await kubectlDryRun(it.answerText);
        box2.className = 'dryrun-result check-result ' + (r.ok ? 'check-ok' : 'check-bad');
        box2.innerHTML = `<strong>kubectl ${r.ok ? 'accepted' : 'rejected'} your manifests</strong> (context <code>${esc(r.context || '?')}</code>)<pre><code>${esc((r.output || '').trim() || '(no output)')}</code></pre>`;
      } catch (e) {
        helperEnabled = false; save(LS_HELPER, null);
        box2.className = 'dryrun-result check-result check-na';
        box2.innerHTML = helperHelpHtml() + '<div class="muted small">The button is hidden again until the helper is found.</div>';
        editor.querySelector('#btn-dryrun').classList.add('hidden'); editor.querySelector('#btn-enable-helper').classList.remove('hidden');
      }
    });
    wrap.appendChild(editor);

    if (it.check) wrap.appendChild(renderCheckResult(it.check));

    if (it.revealed) {
      const sol = document.createElement('div');
      sol.innerHTML = `<div class="lab-solution"><div class="lab-solution-head">Reference solution</div><div class="md">${mdLite(it.solution)}</div></div>
        <div class="grade-row"><span class="muted small">Your result${it.check && it.check.checkable ? ' (suggested from the check, override if you disagree)' : ''}:</span>${LAB_GRADES.map(([v, label, cls]) =>
          `<button type="button" class="btn btn-sm grade-btn grade-${cls}${it.grade === +v ? ' active' : ''}" data-grade="${v}">${label}</button>`).join('')}</div>`;
      sol.querySelectorAll('.grade-btn').forEach((b) => b.addEventListener('click', () => {
        it.grade = +b.dataset.grade; it.gradeManual = true; it.selected = ['graded']; it.checked = true; persistSession(); renderQuestion();
      }));
      wrap.appendChild(sol);
    }
    fb.className = 'feedback hidden';
    box.appendChild(wrap);
  }

  function renderCheckResult(c) {
    const div = document.createElement('div');
    if (!c.checkable) {
      div.className = 'check-result check-na';
      div.innerHTML = `<strong>Nothing machine-checkable in this reference solution</strong> (no YAML or kubectl commands). Compare by eye and grade yourself.${c.errors.length ? `<div class="check-errors">${c.errors.map(esc).join('<br>')}</div>` : ''}`;
      return div;
    }
    const cls = c.pct >= 75 ? 'ok' : c.pct >= 40 ? 'warn' : 'bad';
    const rows = [
      ...c.yaml.map((y) => `<li><code>${esc(y.kind)}</code>: ${y.hit}/${y.total} fields${y.missing.length ? ` · missing: ${y.missing.slice(0, 8).map((m) => `<code>${esc(m)}</code>`).join(' ')}${y.missing.length > 8 ? ' …' : ''}` : ' ✔'}</li>`),
      ...c.cmds.map((k) => `<li><code>${esc(k.cmd.length > 70 ? k.cmd.slice(0, 70) + '…' : k.cmd)}</code>: ${k.hit}/${k.total} tokens${k.missing.length ? ` · missing: ${k.missing.slice(0, 8).map((m) => `<code>${esc(m)}</code>`).join(' ')}` : ' ✔'}</li>`),
    ].join('');
    div.className = `check-result check-${cls}`;
    div.innerHTML = `<div class="check-head"><span class="check-pct">${c.pct}%</span> of the reference's fields and command tokens found in your answer · suggested: <strong>${LAB_GRADES.find((g) => +g[0] === c.suggested)[1]}</strong></div>
      <ul>${rows}</ul>${c.errors.length ? `<div class="check-errors">YAML errors: ${c.errors.map(esc).join('<br>')}</div>` : ''}
      <div class="muted small">Fields are compared as <code>path=value</code>; a different but valid approach will score low even if it works. The reference solution is the judge, not this checker.</div>`;
    return div;
  }

  function select(key) {
    const it = session.items[session.idx];
    if (session.mode === 'practice' && it.checked) return;
    if (it.multi) {
      if (it.selected.includes(key)) it.selected = it.selected.filter((k) => k !== key);
      else if (it.selected.length < it.correct.length) it.selected = [...it.selected, key].sort();
      else return; // already picked the max number of answers
    } else {
      it.selected = it.selected[0] === key ? [] : [key];
    }
    persistSession();
    renderQuestion();
  }

  function toggleFlag() {
    const it = session.items[session.idx];
    it.flagged = !it.flagged;
    persistSession();
    renderQuestion();
  }

  function go(delta) {
    const n = session.idx + delta;
    if (n < 0 || n >= session.items.length) return;
    session.idx = n; persistSession(); renderQuestion();
  }
  function goTo(i) { session.idx = i; persistSession(); renderQuestion(); }

  function checkAnswer() {
    const it = session.items[session.idx];
    if (!it.selected.length || it.checked) return;
    it.checked = true;
    rememberWrong(session.exam, it, !sameSet(it.selected, it.correct));
    persistSession();
    renderQuestion();
  }

  function renderNavGrid() {
    const grid = $('nav-grid');
    grid.innerHTML = '';
    session.items.forEach((_, i) => {
      const c = document.createElement('button');
      c.className = 'nav-cell'; c.textContent = i + 1; c.dataset.idx = i; c.type = 'button';
      c.addEventListener('click', () => goTo(i));
      grid.appendChild(c);
    });
    session.items.forEach((_, i) => updateNavCell(i));
  }
  function updateNavCell(i) {
    const it = session.items[i];
    const cell = document.querySelector(`.nav-cell[data-idx="${i}"]`);
    if (!cell) return;
    cell.classList.toggle('answered', it.selected.length > 0 && !(session.mode === 'practice' && it.checked) && it.kind !== 'lab');
    cell.classList.toggle('flagged', it.flagged);
    if (it.kind === 'lab') {
      cell.classList.toggle('correct', it.grade === 1); cell.classList.toggle('wrong', it.grade === 0); cell.classList.toggle('partial', it.grade === 0.5);
      return;
    }
    if (session.mode === 'practice' && it.checked) {
      const ok = sameSet(it.selected, it.correct);
      cell.classList.toggle('correct', ok); cell.classList.toggle('wrong', !ok);
    }
  }
  function updateNavSummary() {
    const answered = session.items.filter((i) => i.selected.length).length;
    const flagged = session.items.filter((i) => i.flagged).length;
    const word = session.items[0] && session.items[0].kind === 'lab' ? 'graded' : 'answered';
    $('nav-summary').textContent = `${answered} ${word} · ${session.items.length - answered} left · ${flagged} flagged`;
  }

  /* ------------------------------------------------------------------ pause */
  function pause() {
    if (!session.allowPause || session.pausedAt) return;
    session.pausedAt = Date.now(); persistSession();
    $('pause-overlay').classList.remove('hidden');
  }
  function resume() {
    if (session.pausedAt) { session.pausedAccum += Date.now() - session.pausedAt; session.pausedAt = null; persistSession(); }
    $('pause-overlay').classList.add('hidden');
  }

  /* ------------------------------------------------------------------ finish + scoring */
  function confirmFinish() {
    const left = session.items.filter((i) => !i.selected.length).length;
    const flagged = session.items.filter((i) => i.flagged).length;
    const parts = [];
    const isLab = session.items[0] && session.items[0].kind === 'lab';
    if (left) parts.push(isLab ? `<strong>${left}</strong> task${left > 1 ? 's' : ''} not graded yet will count as not solved.` : `<strong>${left}</strong> unanswered question${left > 1 ? 's' : ''} will count as wrong.`);
    if (flagged) parts.push(`${flagged} still flagged.`);
    if (!parts.length) parts.push('All questions answered.');
    openModal(session.mode === 'exam' ? 'Finish exam?' : 'Finish practice?', parts.join(' ') + ' You cannot come back after submitting.', () => finish(false));
  }

  function finish(timedOut) {
    if (session.finished) return;
    stopTimer();
    if (session.pausedAt) resume();
    session.finished = true;
    session.finishedAt = Date.now();
    session.timedOut = !!timedOut;
    session.elapsed = Math.min(elapsedSec(), session.durationSec || Infinity);

    // Random unscored set (like the real exam's unscored items).
    const idxs = session.items.map((_, i) => i);
    const unscored = new Set(sample(idxs, session.unscoredCount));
    session.items.forEach((it, i) => {
      it.unscored = unscored.has(i);
      if (it.kind === 'lab') { it.score = it.grade == null ? 0 : it.grade; it.isCorrect = it.score === 1; }
      else { it.score = it.selected.length > 0 && sameSet(it.selected, it.correct) ? 1 : 0; it.isCorrect = it.score === 1; }
      if (session.mode === 'exam') rememberWrong(session.exam, it, !it.isCorrect);
    });

    const total = session.items.length;
    const sum = (arr) => arr.reduce((a, i) => a + i.score, 0);
    const rawCorrect = Math.round(sum(session.items) * 10) / 10;       // partial lab credit counts as 0.5
    const scoredItems = session.items.filter((i) => !i.unscored);
    const scoredCorrect = Math.round(sum(scoredItems) * 10) / 10;
    const scaled = scoredItems.length ? Math.round(100 + (scoredCorrect / scoredItems.length) * 900) : 0;

    session.result = {
      total, rawCorrect, rawPct: pct(rawCorrect, total),
      scoredTotal: scoredItems.length, scoredCorrect, scoredPct: pct(scoredCorrect, scoredItems.length),
      scaled, pass: session.scoring === 'percent' ? pct(scoredCorrect, scoredItems.length) >= session.passPct : scaled >= session.passScaled,
      scoring: session.scoring,
    };

    if (session.mode === 'exam') {
      const hist = load(LS_HISTORY, []);
      hist.unshift({ at: session.finishedAt, exam: session.exam, mode: 'exam', total, unscored: session.unscoredCount, elapsed: session.elapsed,
                     timedOut: session.timedOut, ...session.result, wrongIds: session.items.filter((i) => !i.isCorrect).map((i) => i.id) });
      save(LS_HISTORY, hist.slice(0, 200));
    }
    persistSession();
    renderResults();
  }

  function wrongPool(code) { return (load(LS_WRONG, {})[code]) || []; }
  function rememberWrong(code, item, wrong) {
    const all = load(LS_WRONG, {});
    const set = new Set(all[code] || []);
    if (wrong) set.add(item.id); else set.delete(item.id);
    all[code] = [...set];
    save(LS_WRONG, all);
  }

  /* ------------------------------------------------------------------ results view */
  function renderResults() {
    show('results');
    const r = session.result;
    const isExam = session.mode === 'exam';
    const meta = EXAMS[session.exam] || {};

    const percentMode = session.scoring === 'percent';
    $('res-scaled').textContent = isExam ? (percentMode ? `${r.scoredPct}%` : r.scaled) : `${r.rawPct}%`;
    document.querySelector('#score-ring .ring-sub').textContent = isExam ? (percentMode ? 'scored questions' : '/ 1000') : 'correct';
    const ring = $('score-ring');
    ring.classList.toggle('fail', isExam ? !r.pass : r.rawPct < 70);
    const frac = isExam ? (percentMode ? r.scoredPct / 100 : (r.scaled - 100) / 900) : r.rawPct / 100;
    requestAnimationFrame(() => { $('ring-fg').style.strokeDashoffset = String(326.7 * (1 - Math.max(0, Math.min(1, frac)))); });

    const v = $('res-verdict');
    if (isExam) {
      v.textContent = r.pass ? 'PASS' : 'FAIL';
      v.className = 'verdict ' + (r.pass ? 'pass' : 'fail');
      const need = percentMode
        ? `Passing needs ${session.passPct}%, i.e. ${Math.ceil(r.scoredTotal * session.passPct / 100)} of the ${r.scoredTotal} scored questions.`
        : `Passing needs ${session.passScaled}/1000, roughly ${Math.ceil(r.scoredTotal * (session.passScaled - 100) / 900)} of the ${r.scoredTotal} scored questions.`;
      $('res-summary').textContent = `${session.exam} ${meta.name || ''}. ` + (session.timedOut ? 'Time ran out - the exam was submitted automatically. ' : '') + need;
    } else {
      v.textContent = 'Practice complete';
      v.className = 'verdict';
      $('res-summary').textContent = `${session.exam} ${meta.name || ''}. Practice sessions are not saved to history, but wrong answers feed "Practice my mistakes".`;
    }

    $('res-raw').textContent = `${r.rawPct}%`;
    const isLab = session.items[0] && session.items[0].kind === 'lab';
    $('res-raw-sub').textContent = `${r.rawCorrect} / ${r.total} ${isLab ? 'tasks solved (partial = ½)' : 'correct'}`;
    $('res-scored').textContent = `${r.scoredPct}%`;
    $('res-scored-sub').textContent = `${r.scoredCorrect} / ${r.scoredTotal} ${isLab ? 'tasks solved' : 'correct'}`;
    $('res-time').textContent = fmtDuration(session.elapsed);
    $('res-time-sub').textContent = isExam ? `of ${fmtDuration(session.durationSec)} · ${fmtDuration(session.elapsed / r.total)} per question`
                                           : `${fmtDuration(session.elapsed / r.total)} per question`;
    $('res-unscored').textContent = session.unscoredCount;
    $('res-unscored-sub').textContent = session.unscoredCount ? `${session.items.filter((i) => i.unscored && i.isCorrect).length} of them correct` : 'none';
    document.querySelector('.tile-accent').classList.toggle('hidden', !isExam);
    $('res-unscored').parentElement.classList.toggle('hidden', !isExam);
    $('btn-retry-wrong').classList.toggle('hidden', !session.items.some((i) => !i.isCorrect));

    reviewFilter = 'all';
    document.querySelectorAll('#review-filters .chip').forEach((c) => c.classList.toggle('active', c.dataset.filter === 'all'));
    renderReview();
  }

  function renderReview() {
    const list = $('review-list');
    list.innerHTML = '';
    const items = session.items.map((it, i) => ({ it, i })).filter(({ it }) => {
      switch (reviewFilter) {
        case 'wrong': return !it.isCorrect && it.selected.length > 0 && it.grade !== 0.5;
        case 'correct': return it.isCorrect;
        case 'unanswered': return it.selected.length === 0;
        case 'flagged': return it.flagged;
        case 'unscored': return it.unscored;
        default: return true;
      }
    });
    if (!items.length) { list.innerHTML = '<p class="muted">Nothing here.</p>'; return; }
    const frag = document.createDocumentFragment();
    items.forEach(({ it, i }) => {
      if (it.kind === 'lab') {
        const g = it.grade == null ? 'unanswered' : it.grade === 1 ? 'correct' : it.grade === 0.5 ? 'partial' : 'wrong';
        const label = { unanswered: 'Not graded', correct: 'Solved', partial: 'Partially solved', wrong: 'Not solved' }[g];
        const div = document.createElement('div');
        div.className = `review-item is-${g === 'partial' ? 'unanswered' : g}`;
        div.innerHTML = `
          <div class="review-head"><span class="pill">T${i + 1}</span><span class="pill badge-${g === 'correct' ? 'correct' : g === 'partial' ? 'unscored' : 'wrong'}">${label}</span>
            ${it.weight ? `<span class="pill pill-soft">weight ${it.weight}%</span>` : ''}${it.flagged ? '<span class="pill badge-flag">⚑ Flagged</span>' : ''}
            <span class="pill pill-soft">${esc(sourcesLabel(it))}</span></div>
          <div class="review-q md">${mdLite(it.q)}</div>
          ${it.answerText ? `<details class="expl"><summary>Your answer${it.check && it.check.checkable ? ` · check ${it.check.pct}%` : ''}</summary><div class="md"><pre><code>${esc(it.answerText)}</code></pre></div></details>` : ''}
          <details class="expl" open><summary>Reference solution</summary><div class="md">${mdLite(it.solution)}</div></details>`;
        frag.appendChild(div);
        return;
      }
      const state = it.isCorrect ? 'correct' : (it.selected.length ? 'wrong' : 'unanswered');
      const div = document.createElement('div');
      div.className = `review-item is-${state}` + (it.unscored ? ' is-unscored' : '');
      const badges = [
        `<span class="pill">Q${i + 1}</span>`,
        `<span class="pill badge-${state === 'unanswered' ? 'wrong' : state}">${state === 'unanswered' ? 'Unanswered' : state === 'correct' ? 'Correct' : 'Wrong'}</span>`,
        it.unscored ? '<span class="pill badge-unscored">Unscored</span>' : '',
        it.flagged ? '<span class="pill badge-flag">⚑ Flagged</span>' : '',
        `<span class="pill pill-soft">${esc(sourcesLabel(it))}</span>`,
        it.disputed ? '<span class="pill badge-unscored">⚠ disputed answer</span>' : '',
      ].join('');
      const opts = it.options.map((o) => {
        const isC = it.correct.includes(o.key), isS = it.selected.includes(o.key);
        const cls = isC && isS ? 'correct' : isC ? 'missed' : isS ? 'wrong' : '';
        return `<div class="option ${cls}"><span class="key">${o.key}</span><span class="txt">${esc(o.text)}</span></div>`;
      }).join('');
      div.innerHTML = `
        <div class="review-head">${badges}</div>
        <div class="review-q">${esc(it.q)}</div>
        ${it.img ? `<img class="q-img" src="${esc(it.img)}" alt="Question diagram">` : ''}
        <div class="options">${opts}</div>
        <div class="review-foot">
          <span>Your answer: <strong>${it.selected.length ? it.selected.join(', ') : '—'}</strong></span>
          <span>Correct: <strong>${it.correct.join(', ')}</strong></span>
        </div>
        ${explanationHtml(it.explanation)}${disputedHtml(it)}`;
      frag.appendChild(div);
    });
    list.appendChild(frag);
  }

  /* ------------------------------------------------------------------ home */
  function renderHome() {
    show('home');
    renderExamGrid();
    applyExamDefaults();
    const codes = Object.keys(EXAMS);
    const total = codes.reduce((s, c) => s + EXAMS[c].count, 0);
    $('catalog-stats').textContent = `${codes.length} exams · ${total} questions`;
    $('source-credits').innerHTML = Object.values(SOURCES).map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join(', ');

    const saved = load(LS_SESSION, null);
    const canResume = saved && !saved.finished && EXAMS[saved.exam];
    $('btn-resume-exam').classList.toggle('hidden', !canResume);
    if (canResume) {
      const rem = saved.durationSec - (Date.now() - saved.startedAt - saved.pausedAccum - (saved.pausedAt ? Date.now() - saved.pausedAt : 0)) / 1000;
      $('btn-resume-exam').textContent = saved.mode === 'exam'
        ? `Resume ${saved.exam} exam (${fmtClock(Math.max(0, rem))} left)`
        : `Resume ${saved.exam} practice`;
    }
    renderHistory();
  }

  const VENDOR_ORDER = ['AWS', 'Azure', 'GCP', 'Kubernetes', 'HashiCorp'];
  const LEVEL_ORDER = ['Foundational', 'Associate', 'Professional', 'Specialty'];
  let vendorFilter = load('ccp.vendor', 'all');

  function renderExamGrid() {
    const grid = $('exam-grid');
    grid.innerHTML = '';
    const hist = load(LS_HISTORY, []);
    const vendors = [...new Set(Object.values(EXAMS).map((m) => m.vendor || 'AWS'))].sort((a, b) => VENDOR_ORDER.indexOf(a) - VENDOR_ORDER.indexOf(b));
    if (vendorFilter !== 'all' && !vendors.includes(vendorFilter)) vendorFilter = 'all';

    const tabs = $('vendor-tabs');
    tabs.innerHTML = '';
    [['all', 'All'], ...vendors.map((v) => [v, v])].forEach(([val, label]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'chip' + (vendorFilter === val ? ' active' : ''); b.textContent = label;
      const n = val === 'all' ? Object.keys(EXAMS).length : Object.values(EXAMS).filter((m) => (m.vendor || 'AWS') === val).length;
      b.textContent = `${label} (${n})`;
      b.addEventListener('click', () => { vendorFilter = val; save('ccp.vendor', val); renderExamGrid(); });
      tabs.appendChild(b);
    });

    const codes = Object.keys(EXAMS)
      .filter((c) => vendorFilter === 'all' || (EXAMS[c].vendor || 'AWS') === vendorFilter)
      .sort((a, b) => VENDOR_ORDER.indexOf(EXAMS[a].vendor) - VENDOR_ORDER.indexOf(EXAMS[b].vendor)
        || LEVEL_ORDER.indexOf(EXAMS[a].level) - LEVEL_ORDER.indexOf(EXAMS[b].level) || a.localeCompare(b));
    let lastVendor = null;
    codes.forEach((code) => {
      const m = EXAMS[code];
      if (vendorFilter === 'all' && m.vendor !== lastVendor) {
        lastVendor = m.vendor;
        const h = document.createElement('div'); h.className = 'vendor-heading'; h.textContent = m.vendor; grid.appendChild(h);
      }
      const percentMode = m.scoring === 'percent';
      const mine = hist.filter((h) => h.exam === code);
      const best = mine.reduce((b, h) => Math.max(b, percentMode ? h.scoredPct : h.scaled), 0);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'exam-card' + (code === currentExam ? ' active' : '') + (m.retired ? ' retired' : '');
      btn.dataset.code = code;
      btn.innerHTML = `
        <div class="exam-card-top"><span class="exam-code">${code}</span><span class="exam-level lvl-${m.level.toLowerCase()}">${m.level}</span></div>
        <div class="exam-name">${esc(m.name)}</div>
        <div class="exam-facts">${m.count} ${m.kind === 'lab' ? 'tasks' : 'q'} in bank · ${m.questions} ${m.kind === 'lab' ? 'tasks' : 'q'} / ${m.minutes} min · pass ${percentMode ? m.passPct + '%' : m.pass}</div>
        ${m.kind === 'lab' ? '<div class="exam-facts">Hands-on: reveal reference solution, grade yourself</div>' : ''}
        <div class="exam-foot">${m.retired ? `<span class="pill badge-unscored">retired ${m.retired}</span>` : ''}${best ? `<span class="pill pill-soft">best ${percentMode ? best + '%' : best}</span>` : ''}${m.count < m.questions ? '<span class="pill badge-wrong">small bank</span>' : ''}</div>`;
      btn.addEventListener('click', () => selectExam(code));
      grid.appendChild(btn);
    });
  }

  function selectExam(code) {
    if (!EXAMS[code]) return;
    currentExam = code; save(LS_EXAM, code);
    document.querySelectorAll('.exam-card').forEach((c) => c.classList.toggle('active', c.dataset.code === code));
    applyExamDefaults();
    renderHistoryStats();
  }

  function applyExamDefaults() {
    const m = EXAMS[currentExam];
    $('brand-exam').textContent = `· ${currentExam}`;
    $('exam-mode-code').textContent = currentExam;
    $('prac-mode-code').textContent = currentExam;
    $('opt-count').value = Math.min(m.questions, m.count); $('opt-count').max = m.count;
    $('opt-minutes').value = m.minutes;
    $('opt-unscored').value = Math.min(m.unscored, Math.max(0, Math.min(m.questions, m.count) - 1));
    $('opt-unscored').disabled = m.kind === 'lab';
    $('opt-shuffle').disabled = m.kind === 'lab';
    $('prac-count').max = m.count;
    $('prac-count').value = Math.min(m.kind === 'lab' ? m.questions : 30, m.count);
    // source filter
    const sel = $('prac-source');
    sel.innerHTML = '<option value="all">All sources</option>';
    Object.entries(m.sources || {}).forEach(([p, n]) => {
      const o = document.createElement('option'); o.value = p; o.textContent = `${sourceName(p)} (${n})`; sel.appendChild(o);
    });
    if (m.sources && m.sources.kn) {
      for (let n = 1; n <= 23; n++) { const o = document.createElement('option'); o.value = `kn:${n}`; o.textContent = `  kananinirav · practice exam ${n}`; sel.appendChild(o); }
    }
  }

  function renderHistory() {
    const hist = load(LS_HISTORY, []);
    const table = $('history-table'), tbody = table.querySelector('tbody');
    $('history-empty').classList.toggle('hidden', hist.length > 0);
    table.classList.toggle('hidden', hist.length === 0);
    tbody.innerHTML = '';
    hist.forEach((h, idx) => {
      const tr = document.createElement('tr');
      const d = new Date(h.at);
      tr.innerHTML = `
        <td>${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
        <td><strong>${esc(h.exam || '?')}</strong></td>
        <td>${h.total} q / ${h.unscored} unscored</td>
        <td><strong>${h.scoring === 'percent' ? h.scoredPct + '%' : h.scaled}</strong></td>
        <td>${h.rawPct}% <span class="muted small">(${h.rawCorrect}/${h.total})</span></td>
        <td>${h.scoredPct}% <span class="muted small">(${h.scoredCorrect}/${h.scoredTotal})</span></td>
        <td class="${h.pass ? 'tag-pass' : 'tag-fail'}">${h.pass ? 'PASS' : 'FAIL'}${h.timedOut ? ' ⏱' : ''}</td>
        <td>${fmtDuration(h.elapsed)}</td>
        <td>${h.wrongIds && h.wrongIds.length && EXAMS[h.exam] ? `<button class="btn btn-ghost btn-sm" data-redo="${idx}">Redo ${h.wrongIds.length} wrong</button>` : ''}</td>`;
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll('[data-redo]').forEach((b) => b.addEventListener('click', () => {
      const h = hist[+b.dataset.redo];
      selectExam(h.exam);
      startPractice(h.wrongIds);
    }));
    renderHistoryStats();
  }

  function renderHistoryStats() {
    const hist = load(LS_HISTORY, []).filter((h) => h.exam === currentExam);
    const stats = $('history-stats');
    const wrongPoolSize = wrongPool(currentExam).length;
    if (hist.length) {
      const passes = hist.filter((h) => h.pass).length;
      const percentMode = (EXAMS[currentExam].scoring || 'scaled') === 'percent';
      const val = (h) => percentMode ? h.scoredPct : h.scaled;
      const fmt = (x) => percentMode ? `${Math.round(x * 10) / 10}%` : Math.round(x);
      const avg = hist.reduce((s, h) => s + val(h), 0) / hist.length;
      const best = Math.max(...hist.map(val));
      stats.innerHTML = `<span>${currentExam}: attempts <b>${hist.length}</b></span><span>Pass rate <b>${pct(passes, hist.length)}%</b></span>` +
        `<span>Avg <b>${fmt(avg)}</b></span><span>Best <b>${fmt(best)}</b></span><span>Mistake pool <b>${wrongPoolSize}</b></span>`;
    } else {
      stats.innerHTML = `<span>${currentExam}: no attempts yet</span>` + (wrongPoolSize ? `<span>Mistake pool <b>${wrongPoolSize}</b></span>` : '');
    }
  }

  /* ------------------------------------------------------------------ modal */
  let modalOk = null;
  function openModal(title, bodyHtml, onOk) {
    $('modal-title').textContent = title;
    $('modal-body').innerHTML = bodyHtml;
    modalOk = onOk;
    $('modal-ok').classList.toggle('hidden', !onOk);
    $('modal-cancel').textContent = onOk ? 'Cancel' : 'Close';
    $('modal').classList.remove('hidden');
  }
  function closeModal() { $('modal').classList.add('hidden'); modalOk = null; }
  $('modal-cancel').addEventListener('click', closeModal);
  $('modal-ok').addEventListener('click', () => { const f = modalOk; closeModal(); if (f) f(); });
  $('modal').addEventListener('click', (e) => { if (e.target === $('modal')) closeModal(); });

  /* ------------------------------------------------------------------ wiring */
  $('btn-start-exam').addEventListener('click', startExam);
  $('btn-start-practice').addEventListener('click', () => startPractice(null));
  $('btn-resume-exam').addEventListener('click', async () => {
    const saved = load(LS_SESSION, null);
    if (!saved || !EXAMS[saved.exam]) return;
    session = saved;
    if (!session.passScaled) session.passScaled = EXAMS[session.exam].pass;
    selectExam(session.exam);
    enterExam();
    if (session.pausedAt) $('pause-overlay').classList.remove('hidden');
  });
  $('btn-clear-history').addEventListener('click', () =>
    openModal('Clear history?', 'This removes all saved attempts and mistake pools for every exam from this browser.', () => {
      save(LS_HISTORY, null); save(LS_WRONG, null); renderHistory(); renderExamGrid();
    }));
  $('btn-prev').addEventListener('click', () => go(-1));
  $('btn-next').addEventListener('click', () => go(1));
  $('btn-flag').addEventListener('click', toggleFlag);
  $('btn-check').addEventListener('click', checkAnswer);
  $('btn-finish').addEventListener('click', confirmFinish);
  $('btn-finish-side').addEventListener('click', confirmFinish);
  $('btn-pause').addEventListener('click', pause);
  $('btn-resume').addEventListener('click', resume);
  $('btn-home').addEventListener('click', () => { session = null; renderHome(); });
  $('btn-retry').addEventListener('click', () => { session = null; renderHome(); startExam(); });
  $('btn-retry-wrong').addEventListener('click', () => startPractice(session.items.filter((i) => !i.isCorrect).map((i) => i.id)));
  $('brand').addEventListener('click', () => {
    if (session && !session.finished) {
      openModal('Leave exam?', 'Your progress is saved - you can resume from the home screen. The clock keeps running.', () => { renderHome(); });
    } else { session = null; renderHome(); }
  });
  document.querySelectorAll('#review-filters .chip').forEach((c) => c.addEventListener('click', () => {
    reviewFilter = c.dataset.filter;
    document.querySelectorAll('#review-filters .chip').forEach((x) => x.classList.toggle('active', x === c));
    renderReview();
  }));

  document.addEventListener('keydown', (e) => {
    if (!session || session.finished || views.exam.classList.contains('hidden')) return;
    if (!$('modal').classList.contains('hidden') || !$('pause-overlay').classList.contains('hidden')) return;
    if (e.target && /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
    const k = e.key;
    const cur = session.items[session.idx];
    if (cur && cur.kind === 'lab') {
      if (k === 'ArrowRight') { go(1); e.preventDefault(); }
      else if (k === 'ArrowLeft') { go(-1); e.preventDefault(); }
      else if (k === 'f' || k === 'F') toggleFlag();
      else if (k === 'r' || k === 'R') { cur.revealed = true; persistSession(); renderQuestion(); }
      else if (cur.revealed && /^[1-3]$/.test(k)) { cur.grade = [1, 0.5, 0][+k - 1]; cur.selected = ['graded']; cur.checked = true; persistSession(); renderQuestion(); }
      return;
    }
    if (k === 'ArrowRight') { go(1); e.preventDefault(); }
    else if (k === 'ArrowLeft') { go(-1); e.preventDefault(); }
    else if (k === 'f' || k === 'F') toggleFlag();
    else if (/^[a-eA-E]$/.test(k)) { const key = k.toUpperCase(); if (session.items[session.idx].options.some((o) => o.key === key)) select(key); }
    else if (/^[1-7]$/.test(k)) { const o = session.items[session.idx].options[+k - 1]; if (o) select(o.key); }
    else if (k === 'Enter' && session.mode === 'practice') { const it = session.items[session.idx]; if (it.checked) go(1); else checkAnswer(); }
  });

  // Keep the clock honest if the tab was in the background (setInterval throttling) and warn before closing mid-exam.
  document.addEventListener('visibilitychange', () => { if (!document.hidden && session && !session.finished) tick(); });
  window.addEventListener('beforeunload', (e) => {
    if (session && !session.finished && session.mode === 'exam') { e.preventDefault(); e.returnValue = ''; }
  });

  renderHome();
})();
