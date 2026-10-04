#!/usr/bin/env python3
"""Local helper for the CKA hands-on mode: real `kubectl apply --dry-run=server` against YOUR cluster.

The browser cannot talk to a Kubernetes cluster, so this runs next to your own cluster (kind, minikube, k3d, …):

    python3 tools/lab_server.py                        # http://127.0.0.1:8766 - serves the app AND the helper
    python3 tools/lab_server.py --context kind-kind    # pin a kube context (default: current context)
    python3 tools/lab_server.py --port 8766

Two ways to use it:

  * Open http://127.0.0.1:8766/ - the helper serves the app itself, same origin, nothing to configure.
    (This also makes the in-browser cluster work, which needs http instead of file://.)
  * Keep using a hosted copy (Netlify, GitHub Pages, …) and click "enable kubectl dry-run" in a task. The page
    then calls http://127.0.0.1:8766 from https: Chrome asks for local-network permission once, other browsers
    may block it; if so use the first way.

Only 127.0.0.1 is served, only `kubectl apply --dry-run=server -f -` is executed, the YAML never touches disk.
"""
import argparse
import json
import os
import subprocess
from functools import partial
from http.server import HTTPServer, SimpleHTTPRequestHandler

ARGS = None
APP_DIR = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))


class Handler(SimpleHTTPRequestHandler):
    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Private-Network', 'true')   # Chrome Private Network Access preflight

    def _json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code); self._cors()
        self.send_header('Content-Type', 'application/json'); self.send_header('Content-Length', str(len(body)))
        self.end_headers(); self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204); self._cors(); self.end_headers()

    def do_GET(self):
        if self.path.split('?')[0] in ('/health', '/dry-run'):
            return self._json({'ok': True, 'helper': 'lab_server', 'context': current_context()})
        return super().do_GET()          # static app files from the repo root

    def end_headers(self):
        # CORS on static files too, harmless and lets a hosted copy fetch nothing more than it already can.
        if self.command == 'GET' and not self.path.startswith('/health'):
            self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_POST(self):
        if self.path.split('?')[0] != '/dry-run':
            return self._json({'ok': False, 'output': 'not found'}, 404)
        length = int(self.headers.get('Content-Length', 0))
        text = self.rfile.read(length).decode('utf-8', 'replace')
        cmd = ['kubectl', 'apply', '--dry-run=server', '-f', '-']
        if ARGS.context:
            cmd += ['--context', ARGS.context]
        try:
            p = subprocess.run(cmd, input=text, capture_output=True, text=True, timeout=60)
            res = {'ok': p.returncode == 0, 'output': (p.stdout + p.stderr), 'context': current_context()}
        except FileNotFoundError:
            res = {'ok': False, 'output': 'kubectl not found in PATH', 'context': None}
        except subprocess.TimeoutExpired:
            res = {'ok': False, 'output': 'kubectl timed out after 60 s', 'context': current_context()}
        self._json(res)

    def log_message(self, fmt, *args):
        print(f'[lab_server] {fmt % args}')


def current_context():
    if ARGS.context:
        return ARGS.context
    try:
        return subprocess.run(['kubectl', 'config', 'current-context'], capture_output=True, text=True, timeout=10).stdout.strip() or None
    except Exception:
        return None


def main():
    global ARGS
    ap = argparse.ArgumentParser()
    ap.add_argument('--port', type=int, default=8766)
    ap.add_argument('--context', default=None, help='kube context to use (default: current)')
    ARGS = ap.parse_args()
    print(f'lab_server: app + kubectl dry-run helper on http://127.0.0.1:{ARGS.port}/  (kube context: {current_context()})')
    HTTPServer(('127.0.0.1', ARGS.port), partial(Handler, directory=APP_DIR)).serve_forever()


if __name__ == '__main__':
    main()
