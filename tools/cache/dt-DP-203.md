### You have an Azure Synapse Analytics dedicated SQL Pool1. Pool1 contains a partitioned fact table named `dbo.Sales` and a staging table named `stg.Sales` that has the matching table and partition definitions. You need to overwrite the content of the first partition in `dbo.Sales` with the content of the same partition in `stg.Sales`. The solution must minimize load times. What should you do?

- [ ] Switch the first partition from `dbo.Sales` to `stg.Sales`.
- [x] Switch the first partition from `stg.Sales` to `dbo.Sales`.
- [ ] Update `dbo.Sales` from `stg.Sales`.
- [ ] Insert the data from `stg.Sales` into `dbo.Sales`.

### You plan to create an Azure Databricks workspace that has a tiered structure. The workspace will contain the following three workloads: A workload for data engineers who will use Python and SQL. A workload for jobs that will run notebooks that use Python, Scala, and SQL. A workload that data scientists will use to perform ad hoc analysis in Scala and R. The enterprise architecture team at your company identifies the following standards for Databricks environments: The data engineers must share a cluster. The job cluster will be managed by using a request process whereby data scientists and data engineers provide packaged notebooks for deployment to the cluster. All the data scientists must be assigned their own cluster that terminates automatically after 120 minutes of inactivity. Currently, there are three data scientists. You need to create the Databricks clusters for the workloads. Solution: You create a Standard cluster for each data scientist, a High Concurrency cluster for the data engineers, and a High Concurrency cluster for the jobs. Does this meet the goal?

- [ ] Yes.
- [x] No.

### You are designing an Azure Stream Analytics solution that will analyze Twitter data. You need to count the tweets in each 10-second window. The solution must ensure that each tweet is counted only once. Solution: You use a session window that uses a timeout size of 10 seconds. Does this meet the goal?

- [ ] Yes.
- [x] No.

### You plan to create an Azure Databricks workspace that has a tiered structure. The workspace will contain the following three workloads: A workload for data engineers who will use Python and SQL. A workload for jobs that will run notebooks that use Python, Scala, and SQL. A workload that data scientists will use to perform ad hoc analysis in Scala and R. The enterprise architecture team at your company identifies the following standards for Databricks environments: The data engineers must share a cluster. The job cluster will be managed by using a request process whereby data scientists and data engineers provide packaged notebooks for deployment to the cluster. All the data scientists must be assigned their own cluster that terminates automatically after 120 minutes of inactivity. Currently, there are three data scientists. You need to create the Databricks clusters for the workloads. Solution: You create a High Concurrency cluster for each data scientist, a High Concurrency cluster for the data engineers, and a Standard cluster for the jobs. Does this meet the goal?

- [ ] Yes.
- [x] No.

### You have an Azure Data Factory instance that contains two pipelines named Pipeline1 and Pipeline2. Pipeline1 has the activities shown in the following exhibit. Pipeline2 has the activities shown in the following exhibit. You execute Pipeline2, and Stored procedure1 in Pipeline1 fails. What is the status of the pipeline runs?

![Question 5 part 1](images/question5_1.png)
![Question 5 part 2](images/question5_2.png)

- [x] Pipeline1 and Pipeline2 succeeded.
- [ ] Pipeline1 and Pipeline2 failed.
- [ ] Pipeline1 succeeded and Pipeline2 failed.
- [ ] Pipeline1 failed and Pipeline2 succeeded.

### You have an Azure Databricks resource. You need to log actions that relate to changes in compute for the Databricks resource. Which Databricks services should you log?

- [x] Clusters.
- [ ] Workspace.
- [ ] DBFS.
- [ ] SSH.
- [ ] Jobs.

### You have an Azure Synapse Analytics dedicated SQL pool that contains a table named Table1. You have files that are ingested and loaded into an Azure Data Lake Storage Gen2 container named container1. You plan to insert data from the files in container1 into Table1 and transform the data. Each row of data in the files will produce one row in the serving layer of Table1. You need to ensure that when the source data files are loaded to container1, the `DateTime` is stored as an additional column in Table1. Solution: In an Azure Synapse Analytics pipeline, you use a Get Metadata activity that retrieves the `DateTime` of the files. Does this meet the goal?

- [ ] Yes.
- [x] No.

### You are designing an Azure Stream Analytics solution that will analyze Twitter data. You need to count the tweets in each 10-second window. The solution must ensure that each tweet is counted only once. Solution: You use a tumbling window, and you set the window size to 10 seconds. Does this meet the goal?

- [ ] Yes.
- [x] No.

### You are designing an Azure Stream Analytics solution that will analyze Twitter data. You need to count the tweets in each 10-second window. The solution must ensure that each tweet is counted only once. Solution: You use a hopping window that uses a hop size of 10 seconds and a window size of 10 seconds. Does this meet the goal?

- [ ] Yes.
- [x] No.

### What should you do to improve high availability of the real-time data processing solution?

- [x] Deploy identical Azure Stream Analytics jobs to paired regions in Azure.
- [ ] Deploy a High Concurrency Databricks cluster.
- [ ] Deploy an Azure Stream Analytics job and use an Azure Automation runbook to check the status of the job and to start the job if it stops.
- [ ] Set Data Lake Storage to use geo-redundant storage (GRS).

### You configure monitoring for a Microsoft Azure SQL Data Warehouse implementation. The implementation uses PolyBase to load data from comma-separated value (CSV) files stored in Azure Data Lake Gen 2 using an external table. Files with an invalid schema cause errors to occur. You need to monitor for an invalid schema error. For which error should you monitor?

- [ ] `EXTERNAL TABLE access failed due to internal error: "Java exception raised on call to HdfsBridge_Connect: Error [com.microsoft.polybase.client.KerberosSecureLogin] occurred while accessing external files."`.
- [ ] `EXTERNAL TABLE access failed due to internal error: Java exception raised on call to HdfsBridge_Connect: Error [No FileSystem for scheme: wasbs] occurred while accessing external file.`
- [x] `Cannot execute the query "Remote Query" against OLE DB provider "SQLNCLI11": for linked server "(null)", Query aborted the maximum reject threshold (o rows) was reached while regarding from an external source: 1 rows rejected out of total 1 rows processed.`
- [ ] `EXTERNAL TABLE access failed due to internal error: 'Java exception raised on call to HdfsBridge_Connect: Error [Unable to instantiate LoginClass] occurred while accessing external files.`

### You need to design a data storage structure for the product sales transactions. The solution must meet the sales transaction dataset requirements. What should you include in the solution? Table type to store the product sales transactions:

- [x] Hash.
- [ ] Round-robin.
- [ ] Replicated.

### You need to design a data storage structure for the product sales transactions. The solution must meet the sales transaction dataset requirements. What should you include in the solution? When creating the table for sales transactions:

- [ ] Configure a clustered index.
- [ ] Set the distribution column to the sales date.
- [x] Set the distribution column to product ID.

### You need to implement an Azure Synapse Analytics database object for storing the sales transactions data. The solution must meet the sales transaction dataset requirements. What should you do?

![Question 14](images/question14.jpg)

- [ ] Transact-SQL DDL command to use: `CREATE EXTERNAL TABLE`. Partitioning option to use in the `WITH` clause of the DDL statement: `FORMAT_TYPE`.
- [x] Transact-SQL DDL command to use: `CREATE TABLE`. Partitioning option to use in the `WITH` clause of the DDL statement: `RANGE RIGHT FOR VALUES`.
- [ ] Transact-SQL DDL command to use: `CREATE TABLE`. Partitioning option to use in the `WITH` clause of the DDL statement: `RANGE LEFT FOR VALUES`.
- [ ] Transact-SQL DDL command to use: `CREATE VIEW`. Partitioning option to use in the `WITH` clause of the DDL statement: `RANGE LEFT FOR VALUES`.

### PLACEHOLDER

- [ ] ...
- [ ] ...
- [ ] ...
- [ ] ...

### You have an Azure Synapse Analytics dedicated SQL pool that contains a table named Table1. You have files that are ingested and loaded into an Azure Data Lake Storage Gen2 container named container1. You plan to insert data from the files in container1 into Table1 and transform the data. Each row of data in the files will produce one row in the serving layer of Table1. You need to ensure that when the source data files are loaded to container1, the DateTime is stored as an additional column in Table1. Solution: You use a dedicated SQL pool to create an external table that has an additional `DateTime` column. Does this meet the goal?

- [ ] Yes.
- [x] No.

### You have an Azure Synapse Analytics dedicated SQL pool that contains a table named Table1. You have files that are ingested and loaded into an Azure Data Lake Storage Gen2 container named container1. You plan to insert data from the files in container1 into Table1 and transform the data. Each row of data in the files will produce one row in the serving layer of Table1. You need to ensure that when the source data files are loaded to container1, the DateTime is stored as an additional column in Table1. Solution: You use an Azure Synapse Analytics serverless SQL pool to create an external table that has an additional `DateTime` column. Does this meet the goal?

- [ ] Yes.
- [x] No.

### You have an Azure Storage account that contains 100 GB of files. The files contain rows of text and numerical values. 75% of the rows contain description data that has an average length of 1.1 MB. You plan to copy the data from the storage account to an enterprise data warehouse in Azure Synapse Analytics. You need to prepare the files to ensure that the data copies quickly. Solution: You modify the files to ensure that each row is less than 1 MB. Does this meet the goal?

- [x] Yes.
- [ ] No.

### You have an Azure Storage account that contains 100 GB of files. The files contain rows of text and numerical values. 75% of the rows contain description data that has an average length of 1.1 MB. You plan to copy the data from the storage account to an enterprise data warehouse in Azure Synapse Analytics. You need to prepare the files to ensure that the data copies quickly. Solution: You convert the files to compressed delimited text files. Does this meet the goal?

- [x] Yes.
- [ ] No.

### You plan to create an Azure Databricks workspace that has a tiered structure. The workspace will contain the following three workloads: A workload for data engineers who will use Python and SQL. A workload for jobs that will run notebooks that use Python, Scala, and SQL. A workload that data scientists will use to perform ad hoc analysis in Scala and R. The enterprise architecture team at your company identifies the following standards for Databricks environments: The data engineers must share a cluster. The job cluster will be managed by using a request process whereby data scientists and data engineers provide packaged notebooks for deployment to the cluster. All the data scientists must be assigned their own cluster that terminates automatically after 120 minutes of inactivity. Currently, there are three data scientists. You need to create the Databricks clusters for the workloads. Solution: You create a Standard cluster for each data scientist, a Standard cluster for the data engineers, and a High Concurrency cluster for the jobs. Does this meet the goal?

- [ ] Yes.
- [x] No.

### You are designing a slowly changing dimension (SCD) for supplier data in an Azure Synapse Analytics dedicated SQL pool. You plan to keep a record of changes to the available fields. The supplier data contains the following columns. Which three additional columns should you add to the data to create a Type 2 SCD?

![Question 21](images/question21.png)

- [x] Surrogate primary key.
- [ ] Foreign key.
- [x] Effective start date.
- [x] Effective end date.
- [ ] Last modified date.
- [ ] Business key.

### You are designing the folder structure for an Azure Data Lake Storage Gen2 container. Users will query data by using a variety of services including Azure Databricks and Azure Synapse Analytics serverless SQL pools. The data will be secured by subject area. Most queries will include data from the current year or current month. Which folder structure should you recommend to support fast queries and simplified folder security?

- [ ] `/{SubjectArea}/{DataSource}/{DD}/{MM}/{YYYY}/{FileData}_{YYYY}_{MM}_{DD}.csv`.
- [ ] `/{DD}/{MM}/{YYYY}/{SubjectArea}/{DataSource}/{FileData}_{YYYY}_{MM}_{DD}.csv`.
- [ ] `/{YYYY}/{MM}/{DD}/{SubjectArea}/{DataSource}/{FileData}_{YYYY}_{MM}_{DD}.csv`.
- [x] `/{SubjectArea}/{DataSource}/{YYYY}/{MM}/{DD}/{FileData}_{YYYY}_{MM}_{DD}.csv`.

### You are designing the folder structure for an Azure Data Lake Storage Gen2 account. You identify the following usage patterns: Users will query data by using Azure Synapse Analytics serverless SQL pools and Azure Synapse Analytics serverless Apache Spark pools. Most queries will include a filter on the current year or week.Data will be secured by data source. You need to recommend a folder structure that meets the following requirements: Supports the usage pattern. Simplifies folder security. Minimizes query times. Which folder structure should you recommend?

- [x] `\DataSource\SubjectArea\YYYY\WW\FileData_YYYY_MM_DD.parquet`.
- [ ] `\DataSource\SubjectArea\YYYY-WW\FileData_YYYY_MM_DD.parquet`.
- [ ] `DataSource\SubjectArea\WW\YYYY\FileData_YYYY_MM_DD.parquet`.
- [ ] `\YYYY\WW\DataSource\SubjectArea\FileData_YYYY_MM_DD.parquet`.
- [ ] `WW\YYYY\SubjectArea\DataSource\FileData_YYYY_MM_DD.parquet`.

### You need to implement the surrogate key for the retail store table. The solution must meet the sales transaction dataset requirements.

- [x] Table that has an `IDENTITY` property.
- [ ] System-versioned temporal table.
- [ ] User-defined `SEQUENCE` object.
- [ ] Table that has a `FOREIGN KEY` constraint.

### You have an Azure Stream Analytics job that is a Stream Analytics project solution in Microsoft Visual Studio. The job accepts data generated by IoT devices in the JSON format. You need to modify the job to accept data generated by the IoT devices in the Protobuf format. Which three actions should you perform from Visual Studio on sequence?

![Question 25](images/question25.jpg)

- [ ] Box 1: Add an Azure Stream Analytics Customer Deserializer Project (.NET) project to the solution. Box 2: Add .NET deserializer code for Protobuf to the custom deserializer project. Box 3: Add an Azure Stream Analytics Application project to the solution.
- [x] Box 1: Add an Azure Stream Analytics Customer Deserializer Project (.NET) project to the solution. Box 2: Add .NET deserializer code for Protobuf to the custom deserializer project. Box 3: Change the event Serialization format to Protobuf in the `input.json` file of the job and reference the DLL.
- [ ] Box 1: Change the event Serialization format to Protobuf in the `input.json` file of the job and reference the DLL. Box 2: Add an Azure Stream Analytics Customer Deserializer Project (.NET) project to the solution. Box 3: Add .NET deserializer code for Protobuf to the custom deserializer project.
- [ ] Box 1: Add an Azure Stream Analytics Application project to the solution. Box 2: Change the event Serialization format to Protobuf in the `input.json` file of the job and reference the DLL. Box 3: Add .NET deserializer code for Protobuf to the Stream Analytics project.

### You have two Azure Storage accounts named Storage1 and Storage2. Each account holds one container and has the hierarchical namespace enabled. The system has files that contain data stored in the Apache Parquet format. You need to copy folders and files from Storage1 to Storage2 by using a Data Factory copy activity. The solution must meet the following requirements: No transformations must be performed. The original folder structure must be retained. Minimize time required to perform the copy activity. How should you configure the copy activity?

![Question 26](images/question26.jpg)

- [x] Source dataset type: Parquet. Copy activity copy behavior: PreserveHierarchy.
- [ ] Source dataset type: Binary. Copy activity copy behavior: PreserveHierarchy.
- [ ] Source dataset type: Parquet. Copy activity copy behavior: FlattenHierarchy.
- [ ] Source dataset type: Binary. Copy activity copy behavior: FlattenHierarchy.

### You need to implement versioned changes to the integration pipelines. The solution must meet the data integration requirements. In which order should you perform the actions?

![Question 27](images/question27.jpg)

- [ ] Box 1: Create a feature branch. Box 2: Merge changes. Box 3: Create a repository and a main branch. Box 4: Create a pull request. Box 5: Publish changes.
- [ ] Box 1: Publish changes. Box 2: Create a repository and a main branch. Box 3: Merge changes. Box 4: Merge changes. Box 5: Publish changes.
- [x] Box 1: Create a repository and a main branch. Box 2: Create a feature branch. Box 3: Create a pull request. Box 4: Merge changes. Box 5: Publish changes.
- [ ] Box 1: Create a feature branch. Box 2: Create a pull request. Box 3: Merge changes. Box 4: Create a repository and a main branch. Box 5: Publish changes.

### You have an Azure data factory named ADF1. You currently publish all pipeline authoring changes directly to ADF1. You need to implement version control for the changes made to pipeline artifacts. The solution must ensure that you can apply version control to the resources currently defined in the UX Authoring canvas for ADF1. Which two actions should you perform?

- [x] From the UX Authoring canvas, select Set up code repository.
- [x] Create a Git repository.
- [ ] Create a GitHub action.
- [ ] Create an Azure Data Factory trigger.
- [ ] From the UX Authoring canvas, select Publish.
- [ ] From the UX Authoring canvas, run Publish All.

### You need to design a data retention solution for the Twitter feed data records. The solution must meet the customer sentiment analytics requirements. Which Azure Storage functionality should you include in the solution?

- [ ] Change feed.
- [ ] Soft delete.
- [ ] Time-based retention.
- [x] Lifecycle management.

### You need to design a data ingestion and storage solution for the Twitter feeds. The solution must meet the customer sentiment analytics requirements. What should you include in the solution?

![Question 30](images/question30.jpg)

- [ ] To increase the throughput of ingesting the Twitter feeds: Configure Event Hubs partitions. To store the Twitter feed data, use: An Azure Databricks high concurrency cluster.
- [x] To increase the throughput of ingesting the Twitter feeds: Configure Event Hubs partitions. To store the Twitter feed data, use: An Azure Data Lake Storage Gen2 account.
- [ ] To increase the throughput of ingesting the Twitter feeds: Use Event Hubs Dedicated. To store the Twitter feed data, use: An Azure General-purpose V2 storage account in the Premium tier.
- [ ] To increase the throughput of ingesting the Twitter feeds: Enable Auto-Inflate in Event Hubs. To store the Twitter feed data, use: An Azure Databricks high concurrency cluster.

### You need to implement a Type 3 slowly changing dimension (SCD) for product category data in an Azure Synapse Analytics dedicated SQL pool. You have a table that was created by using the following Transact-SQL statement. Which two columns should you add to the table?

![Question 31](images/question31.png)

- [ ] `[EffectiveStartDate] [datetime] NOT NULL,`.
- [x] `[CurrentProductCategory] [nvarchar] (100) NOT NULL,`.
- [ ] `[EffectiveEndDate] [datetime] NULL,`.
- [ ] `[ProductCategory] [nvarchar] (100) NOT NULL,`.
- [x] `[OriginalProductCategory] [nvarchar] (100) NOT NULL,`.

### You are implementing a star schema in an Azure Synapse Analytics dedicated SQL pool. You plan to create a table named DimProduct. DimProduct must be a Type 3 slowly changing dimension (SCD) table that meets the following requirements: The values in two columns named ProductKey and ProductSourceID will remain the same. The values in three columns named ProductName, ProductDescription, and Color can change. You need to add additional columns to complete the following table definition. Which three columns should you add?

![Question 32](images/question32.png)

- [ ] `[EffectiveStartDate] [datetime] NOT NULL`.
- [ ] `[EffectiveEndDate] [datetime] NOT NULL`.
- [x] `[OriginalProductDescription] NVARCHAR(2000) NOT NULL`.
- [ ] `[IsCurrentRow] [bit] NOT NULL`.
- [x] `[OriginalColor] NVARCHAR(50) NOT NULL`.
- [x] `[OriginalProductName] NVARCHAR(100) NULL`.

### You are creating dimensions for a data warehouse in an Azure Synapse Analytics dedicated SQL pool. You create a table by using the Transact-SQL statement shown in the following exhibit.

![Question 33](images/question33.jpg)

- [x] DimProduct is a [ansver choice] slowly changing dimension (SCD): Type 2. The ProductKey column is [ansver choice]: a surrogate key.
- [ ] DimProduct is a [ansver choice] slowly changing dimension (SCD): Type 0. The ProductKey column is [ansver choice]: a business key.
- [ ] DimProduct is a [ansver choice] slowly changing dimension (SCD): Type 1. The ProductKey column is [ansver choice]: an audit column.
- [ ] DimProduct is a [ansver choice] slowly changing dimension (SCD): Type 2. The ProductKey column is [ansver choice]: a business key.

### You are designing a highly available Azure Data Lake Storage solution that will induce geo-zone-redundant storage (GZRS). You need to monitor for replication delays that can affect the recovery point objective (RPO). What should you include in the monitoring solution?

- [x] Last Sync Time.
- [ ] Average Success E2E Latency.
- [ ] `5xx`: Server Error errors
- [ ] Availability.

### You are monitoring an Azure Stream Analytics job. The Backlogged Input Events count has been 20 for the last hour. You need to reduce the Backlogged Input Events count. What should you do?

- [ ] Drop late arriving events from the job.
- [ ] Add an Azure Storage account to the job.
- [x] Increase the streaming units for the job.
- [ ] Stop the job.

### You are monitoring an Azure Stream Analytics job. You discover that the Backlogged Input Events metric is increasing slowly and is consistently non-zero. You need to ensure that the job can handle all the events. What should you do?

- [ ] Change the compatibility level of the Stream Analytics job.
- [x] Increase the number of streaming units (SUs).
- [ ] Remove any named consumer groups from the connection and use `$default`.
- [ ] Create an additional output stream for the existing input stream.

### You are building an Azure Stream Analytics job to identify how much time a user spends interacting with a feature on a webpage. The job receives events based on user actions on the webpage. Each row of data represents an event. Each event has a type of either 'start' or 'end'. You need to calculate the duration between start and end events. How should you complete the query?

![Question 37](images/question37.jpg)

- [ ] Box 1: DATEPART. Box 2: TOPONE.
- [x] Box 1: DATEDIFF. Box 2: LAST.
- [ ] Box 1: DATEADD. Box 2: LAST.
- [ ] Box 1: DATEADD. Box 2: ISFIRST.

### You have the following table named Employees. You need to calculate the employee_type value based on the hire_date value. How should you complete the Transact-SQL statement?

![Question 38 part 1](images/question38_1.png)
![Question 38 part 2](images/question38_2.jpg)

- [ ] Box 1: `ELSE`. Box 2: `CASE`.
- [ ] Box 1: `CASE`. Box 2: `OVER`.
- [ ] Box 1: `ELSE`. Box 2: `OVER`.
- [x] Box 1: `CASE`. Box 2: `ELSE`.

### You are building an Azure Stream Analytics job to retrieve game data. You need to ensure that the job returns the highest scoring record for each five-minute time interval of each game. How should you complete the Stream Analytics query?

![Question 39](images/question39.jpg)

- [x] SELECT: `TopOne OVER(PARTITION BY Game ORDER BY Score Desc)`. GROUP BY: `Tumbling(minute, 5)`.
- [ ] SELECT: `CollectTop(1)OVER(ORDER BY Score Desc)`. `GROUP BY: Tumbling(minute, 5)`.
- [ ] SELECT: `TopOne OVER(PARTITION BY Game ORDER BY Score Desc)`. `GROUP BY: Hopping(minute, 5)`.
- [ ] SELECT: `CollectTop(1)OVER(ORDER BY Score Desc)`. GROUP BY: `Windows(TumblingWindow(minute,5),Hopping(minute,5))`.

### You need to design an analytical storage solution for the transactional data. The solution must meet the sales transaction dataset requirements. What should you include in the solution?

![Question 40](images/question40.jpg)

- [ ] Table type to store retail store data: Hash. Table type to store promotional data: Round-robin.
- [ ] Table type to store retail store data: Replicated. Table type to store promotional data: Hash.
- [ ] Table type to store retail store data: Hash. Table type to store promotional data: Replicated.
- [x] Table type to store retail store data: Round-robin. Table type to store promotional data: Hash.

### You have files and folders in Azure Data Lake Storage Gen2 for an Azure Synapse workspace as shown in the following exhibit. You create an external table named `ExtTable` that has `LOCATION='/topfolder/'`. When you query ExtTable by using an Azure Synapse Analytics serverless SQL pool, which files are returned?

![Question 41](images/question41.png)

- [ ] File2.csv and File3.csv only.
- [x] File1.csv and File4.csv only.
- [ ] File1.csv, File2.csv, File3.csv, and File4.csv.
- [ ] File1.csv only.

### You build a data warehouse in an Azure Synapse Analytics dedicated SQL pool. Analysts write a complex SELECT query that contains multiple JOIN and CASE statements to transform data for use in inventory reports. The inventory reports will use the data and additional WHERE parameters depending on the report. The reports will be produced once daily. You need to implement a solution to make the dataset available for the reports. The solution must minimize query times. What should you implement?

- [x] Materialized view.
- [ ] Replicated table.
- [ ] In ordered clustered columnstore index.
- [ ] Result set chaching.

### You are designing an Azure Synapse Analytics dedicated SQL pool. You need to ensure that you can audit access to Personally Identifiable information (PII). What should you include in the solution?

- [ ] Dynamic data masking.
- [ ] Row-level security (RLS).
- [x] Sensitivity classifications.
- [ ] Column-level security.

### You plan to create an Azure Synapse Analytics dedicated SQL pool. You need to minimize the time it takes to identify queries that return confidential information as defined by the company's data privacy regulations and the users who executed the queues. Which two components should you include in the solution?

- [x] Sensitivity-classification labels applied to columns that contain confidential information.
- [ ] Resource tags for databases that contain confidential information.
- [x] Audit logs sent to a Log Analytics workspace.
- [ ] Dynamic data masking for columns that contain confidential information.

### You plan to create a table in an Azure Synapse Analytics dedicated SQL pool. Data in the table will be retained for five years. Once a year, data that is older than five years will be deleted. You need to ensure that the data is distributed evenly across partitions. The solution must minimize the amount of time required to delete old data. How should you complete the Transact-SQL statement?

![Question 45](images/question45.jpg)

- [x] Box 1: HASH. Box 2: OrderDateKey.
- [ ] Box 1: OrderDateKey. Box 2: CustomerKey.
- [ ] Box 1: CustomerKey. Box 2: HASH.
- [ ] Box 1: CustomerKey. Box 2: HASH.

### You use Azure Stream Analytics to receive Twitter data from Azure Event Hubs and to output the data to an Azure Blob storage account. You need to output the count of tweets during the last five minutes every five minutes. Each tweet must only be counted once. Which windowing function should you use?

- [ ] Five-minute Session window.
- [ ] Five-minute Sliding window.
- [x] Five-minute Tumbling window.
- [ ] Five-minute Hopping window that has one-minute hop.

### You use Azure Stream Analytics to receive data from Azure Event Hubs and to output the data to an Azure Blob Storage account. You need to output the count of records received from the last five minutes every minute. Which windowing function should you use?

- [ ] Session.
- [ ] Tumbling.
- [ ] Sliding.
- [x] Hopping.

### What should you recommend using to secure sensitive customer contact information?

- [ ] Data labels.
- [x] Column-level security.
- [ ] Row-level security.
- [ ] Transparent Data Encryption (TDE).

### You have an Azure Synapse Analytics dedicated SQL pool mat contains a table named `dbo.Users`. You need to prevent a group of users from reading user email addresses from `dbo.Users`. What should you use?

- [ ] Row-level security (RLS).
- [x] Column-level security.
- [ ] Dynamic data masking.
- [ ] Transparent Data Encryption (TDE).

### You are designing a security model for an Azure Synapse Analytics dedicated SQL pool that will support multiple companies. You need to ensure that users from each company can view only the data of their respective company. Which two objects should you include in the solution?

- [ ] Custom role-based access control (RBAC) role.
- [ ] Asymmetric keys.
- [x] Predicate function.
- [ ] Column encryption key.
- [x] Security policy.

### You need to design the partitions for the product sales transactions. The solution must meet the sales transaction dataset requirements. What should you include in the solution?

![Question 51](images/question51.jpg)

- [ ] Partition product sales transactions data by: Promotion ID. Store product sales transactions data in: An Azure Synapse Analytics serverless SQL pool.
- [x] Partition product sales transactions data by: Sales date. Store product sales transactions data in: An Azure Synapse Analytics dedicated SQL pool.
- [ ] Partition product sales transactions data by: Product ID. Store product sales transactions data in: An Azure Synapse Analytics serverless SQL pool.
- [ ] Partition product sales transactions data by: Promotion ID. Store product sales transactions data in: An Azure Data Lake Storage Gen2 account linked.

### You have an Azure Storage account and a data warehouse in Azure Synapse Analytics in the UK South region. You need to copy blob data from the storage account to the data warehouse by using Azure Data Factory. The solution must meet the following requirements: Ensure that the data remains in the UK South region at all times. Minimize administrative effort. Which type of integration runtime should you use?

- [x] Azure integration runtime.
- [ ] Azure-SSIS integration runtime.
- [ ] Self-hosted integration runtime.

### You have an Azure SQL database named Database1 and two Azure event hubs named HubA and HubB. The data consumed from each source is shown in the following table. You need to implement Azure Stream Analytics to calculate the average fare per mile by driver. How should you configure the Stream Analytics input for each source?

![Question 53 part 1](images/question53_1.png)
![Question 53 part 2](images/question53_2.png)

- [ ] HubA: Reference. HubB: Stream. Databasel: Stream.
- [ ] HubA: Reference. HubB: Reference. Databasel: Stream.
- [x] HubA: Stream. HubB: Stream. Databasel: Reference.
- [ ] HubA: Reference. HubB: Stream. Databasel: Reference.

### You create an Azure Databricks cluster and specify an additional library to install. When you attempt to load the library to a notebook, the library in not found. You need to identify the cause of the issue. What should you review?

- [ ] Notebook logs.
- [x] Cluster event logs.
- [ ] Global init scripts logs.
- [ ] Workspace logs.

### You are designing an Azure Databricks table. The table will ingest an average of 20 million streaming events per day. You need to persist the events in the table for use in incremental load pipeline jobs in Azure Databricks. The solution must minimize storage costs and incremental load times. What should you include in the solution?

- [ ] Partition by DateTime fields.
- [x] Sink to Azure Queue storage.
- [ ] Include a watermark column.
- [ ] Use a JSON format for physical data storage.

### You are building an Azure Stream Analytics job that queries reference data from a product catalog file. The file is updated daily. The reference data input details for the file are shown in the Input exhibit. The storage account container view is shown in the Refdata exhibit. You need to configure the Stream Analytics job to pick up the new reference data. What should you configure?

![Question 56 part 1](images/question56_1.png)
![Question 56 part 2](images/question56_2.jpg)

- [x] Path pattern: {date}/product.csv. Date format: YYYY-MM-DD.
- [ ] Path pattern: product.csv. Date format: YYYY/MM/DD.
- [ ] Path pattern: {date}/product.csv. Date format: YYYY/MM/DD.
- [ ] Path pattern: */product.csv. Date format: YYYY/MM/DD.

### You are designing a solution that will copy Parquet files stored in an Azure Blob storage account to an Azure Data Lake Storage Gen2 account. The data will be loaded daily to the data lake and will use a folder structure of `{Year}/{Month}/{Day}/`. You need to design a daily Azure Data Factory data load to minimize the data transfer between the two accounts. Which two configurations should you include in the design?

- [ ] Delete the files in the destination before loading new data.
- [x] Filter by the last modified date of the source files.
- [ ] Delete the source files after they are copied.
- [x] Specify a file naming pattern for the destination.

### You have an Azure Synapse Analytics workspace named WS1. You have an Azure Data Lake Storage Gen2 container that contains JSON-formatted files in the following format. You need to use the serverless SQL pool in WS1 to read the files. How should you complete the Transact-SQL statement?

![Question 58](images/question58.png)

- [x] Box 1: `openrowset`. Box 2: `openjson`.
- [ ] Box 1: `openquery`. Box 2: `openrowset`.
- [ ] Box 1: `openjson`. Box 2: `opendatasource`.
- [ ] Box 1: `openquery`. Box 2: `openrowset`.

### You need to implement an Azure Databricks cluster that automatically connects to Azure Data lake Storage Gen2 by using Azure Active Directory (Azure AD) integration. How should you configure the new clutter?

![Question 59](images/question59.png)

- [ ] Tier: Premium. Advanced option to enable: Table Access Gentrol.
- [ ] Tier: Standard. Advanced option to enable: Table Access Gentrol.
- [x] Tier: Premium. Advanced option to enable: Azure Data Lake Storage Credential Passthrough.
- [ ] Tier: Standard. Advanced option to enable: Azure Data Lake Storage Credential Passthrough.

### You plan to create a real-time monitoring app that alerts users when a device travels more than 200 meters away from a designated location. You need to design an Azure Stream Analytics job to process the data for the planned app. The solution must minimize the amount of code developed and the number of technologies used. What should you include in the Stream Analytics job?

![Question 60](images/question60.jpg)

- [ ] Input type: Reference. Function: Windowing.
- [x] Input type: Stream. Function: Geospatial.
- [ ] Input type: Reference. Function: Geospatial.
- [ ] Input type: Stream. Function: Aggregate.

### You have an Azure Synapse Analytics workspace named WS1 that contains an Apache Spark pool named Pool1. You plan to create a database named D61 in Pool1. You need to ensure that when tables are created in DB1, the tables are available automatically as external tables to the built-in serverless SQL pod. Which format should you use for the tables in DB1?

- [x] Parquet.
- [ ] CSV.
- [ ] ORC.
- [ ] JSON.

### You have a self-hosted integration runtime in Azure Data Factory. The current status of the integration runtime has the following configurations: Status: Running Type: Self-Hosted Version: 4.4.7292.1 Running / Registered Node(s): 1/1 High Availability Enabled: False Linked Count: 0 Queue Length: 0 Average Queue Duration. 0.00s The integration runtime has the following node details: Name: X-M Status: Running Version: 4.4.7292.1 Available Memory: 7697MB CPU Utilization: 6% Network (In/Out): 1.21KBps/0.83KBps Concurrent Jobs (Running/Limit): 2/14 Role: Dispatcher/Worker Credential Status.

![Question 62](images/question62.jpg)

- [ ] If the X-M node becomes unavailable, all executed pipelines will be: switch to another integration runtime. Box 2: left as is.
- [ ] If the X-M node becomes unavailable, all executed pipelines will be: exceed the CPU limit. Box 2: left as is.
- [ ] If the X-M node becomes unavailable, all executed pipelines will be: fail until the node comes back online. Box 2: raised.
- [x] If the X-M node becomes unavailable, all executed pipelines will be: fail until the node comes back online. Box 2: lowered.

### You are designing an Azure Databricks interactive cluster. The cluster will be used infrequently and will be configured for auto-termination. You need to ensure that the cluster configuration is retained indefinitely after the cluster is terminated. The solution must minimize costs. What should you do?

- [ ] Clone the cluster after it is terminated.
- [ ] Terminate the cluster manually when processing completes.
- [ ] Create an Azure runbook that starts the cluster every 90 days.
- [x] Pin the cluster.

### You are developing an application that uses Azure Data Lake Storage Gen 2. You need to recommend a solution to grant permissions to a specific application for a limited time period. What should you include in the recommendation?

- [ ] Azure Active Directory (Azure AD) identities.
- [x] Shared Access Signatures (SAS).
- [ ] Account keys.
- [ ] Role assignments.

### You have two Azure Data Factory instances named ADFdev and ADFprod. ADFdev connects to an Azure DevOps Git repository. You publish changes from the main branch of the Git repository to ADFdev. You need to deploy the artifacts from ADFdev to ADFprod. What should you do first?

- [ ] From ADFdev, modify the Git configuration.
- [ ] From ADFdev, create a linked service.
- [x] From Azure DevOps, create a release pipeline.
- [ ] From Azure DevOps, update the main branch.

### You develop a dataset named DBTBL1 by using Azure Databricks. DBTBL1 contains the following columns: SensorTypeID GeographyRegionID Year Month Day HourMinute Temperature WindSpeed Other You need to store the data to support daily incremental load pipelines that vary for each GeographyRegionID. The solution must minimize storage costs. How should you complete the code?

![Question 66](images/question66.jpg)

- [x] Box 1: `.partitionBy`. Box 2: `("Year", "Month", "Day", "GeographyRegionID")`. Box 3: `.saveAsTable(*/DBTBL1")`.
- [ ] Box 1: `.partitionBy`. Box 2: `("GeographyRegionID", "Year", "Month", "Day")`. Box 3: `.parquet("/DBTBL1")`.
- [ ] Box 1: `.sortBy`. Box 2: `("*")`. Box 3: `.json("/DBTBL1")`.
- [ ] Box 1: `.bucketBy`. Box 2: `("GeographyRegionID")`. Box 3: `.csv("/DBTBL1")`.

### You have an Azure Synapse Analytics serverless SQL pool that contains a database named db1. The data model for db1 is shown in the following exhibit.

![Question 67 part 1](images/question67_1.png)
![Question 67 part 2](images/question67_2.jpg)

- [ ] To convert the data model to a star schema: `join DimGeography and DimCustomer`. Once the data model is converted into a star schema, there will be [...] tables: 6.
- [ ] To convert the data model to a star schema: `join DimGeography and FactOrders`. Once the data model is converted into a star schema, there will be [...] tables: 5.
- [x] To convert the data model to a star schema: `join DimGeography and DimCustomer`. Once the data model is converted into a star schema, there will be [...] tables: 5.
- [ ] To convert the data model to a star schema: `union DimGeography and FactOrders`. Once the data model is converted into a star schema, there will be [...] tables: 6.

### You have an Azure Synapse Analytics dedicated SQL pool that contains the users shown in the following table. User1 executes a query on the database, and the query returns the results shown in the following exhibit. User1 is the only user who has access to the unmasked data.

![Question 68 part 1](images/question68_1.png)
![Question 68 part 2](images/question68_2.png)
![Question 68 part 3](images/question68_3.png)
![Question 68 part 4](images/question68_4.jpg)

- [ ] When User2 queries the `YearlyIncome` column, the values returned will be: the values stored in the database. When User1 queries the `BirthDate` column, the values returned will be: a random number.
- [ ] When User2 queries the `YearlyIncome` column, the values returned will be: a random number. When User1 queries the `BirthDate` column, the values returned will be: 1900-01-01.
- [x] When User2 queries the `YearlyIncome` column, the values returned will be: 0. When User1 queries the `BirthDate` column, the values returned will be: the values stored in the database.
- [ ] When User2 queries the `YearlyIncome` column, the values returned will be: XXXX. When User1 queries the `BirthDate` column, the values returned will be: a random number.

### Which Azure Data Factory components should you recommend using together to import the daily inventory data from the SQL server to Azure Data Lake Storage?

![Question 69](images/question69.png)

- [ ] Integration runtime type: Azure integration runtime. Trigger type: Tumbling window trigger. Activity type: Stored procedure activity.
- [ ] Integration runtime type: Azure integration runtime. Trigger type: Schedule trigger. Activity type: Lookup activity.
- [ ] Integration runtime type: Azure-SSIS integration runtime. Trigger type: Event-based trigger. Activity type: Copy activity.
- [x] Integration runtime type: Self-hosted integration runtime. Trigger type: Schedule trigger. Activity type: Copy activity.

### You need to ensure that the Twitter feed data can be analyzed in the dedicated SQL pool. The solution must meet the customer sentiment analytics requirements. Which three Transaction-SQL DDL commands should you run in sequence?

![Question 70](images/question70.png)

- [ ] Box 1: `CREATE EXTERNAL DATA SOURCE`. Box 2: `CREATE EXTERNAL TABLE AS SELECT`. Box 3: `CREATE EXTERNAL FILE FORMAT`.
- [ ] Box 1: `CREATE EXTERNAL DATA SOURCE`. Box 2: `CREATE EXTERNAL FILE FORMAT`. Box 3: `CREATE EXTERNAL TABLE AS SELECT`.
- [x] Box 1: `CREATE EXTERNAL DATA SOURCE`. Box 2: `CREATE EXTERNAL FILE FORMAT`. Box 3: `CREATE TABLE`.
- [ ] Box 1: `CREATE DATABASE SCOPED CREDENTIAL`. Box 2: `CREATE EXTERNAL DATA SOURCE`. Box 3: `CREATE EXTERNAL FILE FORMAT`.

### You are designing a dimension table for a data warehouse. The table will track the value of the dimension attributes over time and preserve the history of the data by adding new rows as the data changes. Which type of slowly changing dimension (SCD) should use?

- [ ] Type 0.
- [ ] Type 1.
- [x] Type 2.
- [ ] Type 3.

### You have an Azure data factory. You need to examine the pipeline failures from the last 60 days. What should you use?

- [ ] the Activity log blade for the Data Factory resource.
- [ ] the Monitor & Manage app in Data Factory.
- [ ] the Resource health blade for the Data Factory resource.
- [x] Azure Monitor.

### You are building an Azure Synapse Analytics dedicated SQL pool that will contain a fact table for transactions from the first half of the year 2020. You need to ensure that the table meets the following requirements: Minimizes the processing time to delete data that is older than 10 years Minimizes the I/O for queries that use year-to-date values How should you complete the Transact-SQL statement?

![Question 73](images/question73.jpg)

- [x] Box 1: `PARTITION`. Box 2: `[TransactionDateID]`.
- [ ] Box 1: `DISTRIBUTION`. Box 2 `ROUND_ROBIN`.
- [ ] Box 1: `CLUSTERED COLUMNSTORE INDEX`. Box 2: `HASH([TransactionTypeID])`.
- [ ] Box 1: `TRUNCATE_TARGET`. Box 2: `HASH ([TransactionTypeID])`.

### You have an Azure Synapse Analytics dedicated SQL pool named Pool1 and a database named DB1. DB1 contains a fact table named Table1. You need to identify the extent of the data skew in Table1. What should you do in Synapse Studio?

- [ ] Connect to the built-in pool and run dbcc pdw_showspaceused.
- [ ] Connect to the built-in pool and run dbcc checkalloc.
- [ ] Connect to Pool1 and query sys.dm_pdw_node_scacus.
- [x] Connect to Pool1 and query sys.dm_pdw_nodes_db_partition_scacs.

### You are planning the deployment of Azure Data Lake Storage Gen2. You have the following two reports that will access the data lake: Report1: Reads three columns from a file that contains 50 columns. Report2: Queries a single record based on a timestamp. You need to recommend in which format to store the data in the data lake to support the reports. The solution must minimize read times. What should you recommend for each report?

![Question 75](images/question75.jpg)

- [ ] Report1: Avro. Report2: CSV.
- [ ] Report1: Avro. Report2: CSV.
- [ ] Report1: TSV. Report2: .Avro
- [x] Report1: CSV. Report2: Avro.

### You are designing an Azure Databricks cluster that runs user-defined local processes. You need to recommend a cluster configuration that meets the following requirements: Minimize query latency. Maximize the number of users that can run queues on the cluster at the same time « Reduce overall costs without compromising other requirements Which cluster type should you recommend?

- [ ] Standard with Auto termination.
- [ ] Standard with Autoscaling.
- [x] High Concurrency with Autoscaling.
- [ ] High Concurrency with Auto Termination.

### You have an enterprise data warehouse in Azure Synapse Analytics that contains a table named FactOnlineSales. The table contains data from the start of 2009 to the end of 2012. You need to improve the performance of queries against FactOnlineSales by using table partitions. The solution must meet the following requirements: Create four partitions based on the order date. Ensure that each partition contains all the orders places during a given calendar year. How should you complete the T-SQL command?

![Question 77](images/question77.jpg)

- [ ] Box 1: `LEFT`. Box 2: `20090101,20121231`.
- [x] Box 1: `LEFT`. Box 2: `20090101,20100101,20110101,20120101`.
- [ ] Box 1: `RIGHT`. Box 2: `20100101,20110101,20120101`.
- [ ] Box 1: `RIGHT`. Box 2: .`20100101,20110101,20120101`

### You have an Azure Data Lake Storage Gen2 account named adls2 that is protected by a virtual network. You are designing a SQL pool in Azure Synapse that will use adls2 as a source. What should you use to authenticate to adls2?

- [ ] a Shared Access Signature (SAS).
- [x] a managed identity.
- [ ] a shared key.
- [ ] an Azure Active Directory (Azure AD) user.

### You plan to ingest streaming social media data by using Azure Stream Analytics. The data will be stored in files in Azure Data Lake Storage, and then consumed by using Azure Datiabricks and PolyBase in Azure Synapse Analytics. You need to recommend a Stream Analytics data output format to ensure that the queries from Databricks and PolyBase against the files encounter the fewest possible errors. The solution must ensure that the tiles can be queried quickly and that the data type information is retained. What should you recommend?

- [x] Parquet.
- [ ] Avro.
- [ ] CSV.
- [ ] JSON.

### You are designing a monitoring solution for a fleet of 500 vehicles. Each vehicle has a GPS tracking device that sends data to an Azure event hub once per minute. You have a CSV file in an Azure Data Lake Storage Gen2 container. The file maintains the expected geographical area in which each vehicle should be. You need to ensure that when a GPS position is outside the expected area, a message is added to another event hub for processing within 30 seconds. The solution must minimize cost. What should you include in the solution?

![Question 80](images/question80.jpg)

- [ ] Service: An Azure Synapse Analytics Apache Spark pool. Window: Hopping. Analysis type: Polygon overlap.
- [ ] Service: An Azure Synapse Analytics serverless SQL pool. Window: Session. Analysis type: Point within polygon.
- [x] Service: Azure Stream Analytics. Window: Hopping. Analysis type: Point within polygon.
- [ ] Service: Azure Stream Factory. Window: No window. Analysis type: Event pattern matching.

### You need to trigger an Azure Data Factory pipeline when a file arrives in an Azure Data Lake Storage Gen2 container. Which resource provider should you enable?

- [ ] Microsoft.Sql.
- [ ] Microsoft-Automation.
- [x] Microsoft.EventGrid.
- [ ] Microsoft.EventHub.

### You are designing an anomaly detection solution for streaming data from an Azure IoT hub. The solution must meet the following requirements: Send the output to Azure Synapse. Identify spikes and dips in time series data. Minimize development and configuration effort. Which should you include in the solution?

- [ ] Azure Databricks.
- [x] Azure Stream Analytics.
- [ ] Azure SQL Database.

### You have an Azure Active Directory (Azure AD) tenant that contains a security group named Group1. You have an Azure Synapse Analytics dedicated SQL pool named dw1 that contains a schema named schema1. You need to grant Group1 read-only permissions to all the tables and views in schema1. The solution must use the principle of least privilege. Which three actions should you perform in sequence?

![Question 83](images/question83.jpg)

- [x] Box 1: Create a database user in dw1 that represents Group1 and user the FROM EXTERNAL PROVIDER clause. Box 2: Create adatabase role named Role1 and grand Role1 SELECT premissions to schema1. Box 3: Assing Role1 to the Group1 database user.
- [ ] Box 1: Assign Rolel to the Groupl database user. Box 2: Create a database role named Role1 and grant Rolel SELECT permissions to schemal. Box 3: Assign the Azure role-based access control (Azure RBAC) Reader role for dwl to Group1.
- [ ] Box 1: Assign the Azure role-based access control (Azure RBAC) Reader role for dwl to Group1. Box 2: Assign Rolel to the Groupl database user. Box 3: Create a database role named Role1 and grant Rolel SELECT permissions to schemal.
- [ ] Box 1: Assign the Azure role-based access control (Azure RBAC) Reader role for dwl to Group1. Box 2: Create a database role named Role1 and grant Rolel SELECT permissions to schemal. Box 3: Assign Rolel to the Groupl database user.

### You need to output files from Azure Data Factory. Which file format should you use for each type of output?

![Question 84](images/question84.jpg)

- [ ] Columnar format: Avro. JSON with a timestamp: GZip.
- [x] Columnar format: Parquet. JSON with a timestamp: Avro.
- [ ] Columnar format: GZip. JSON with a timestamp: Parquet.
- [ ] Columnar format: Avro. JSON with a timestamp: Parquet.

### You plan to create an Azure Data Lake Storage Gen2 account You need to recommend a storage solution that meets the following requirements: Provides the highest degree of data resiliency Ensures that content remains available for writes if a primary data center fails What should you include in the recommendation?

![Question 85](images/question85.png)

- [x] Replication machanism: Zone-redundant storage (ZRS). Failover process: Failover automatically initiated by an Azure Automation job. 
- [ ] Replication machanism: Change feed. Failover process: Failover initiated by Microsoft.
- [x] Replication machanism: Read-access geo-zone-redundant storage (RA-GRS). Failover process: Failover manually initiated by the customer.
- [ ] Replication machanism: Read-access geo-redundant storage (RA-GRS). Failover process: Failover initiated by Microsoft.

### You plan to develop a dataset named Purchases by using Azure databricks Purchases will contain the following columns: ProductID ItemPrice lineTotal Quantity StorelD Minute Month Hour Year Day You need to store the data to support hourly incremental load pipelines that will vary for each StoreID. the solution must minimize storage costs. How should you complete the rode?

![Question 86](images/question86.jpg)

- [ ] Box 1: `.bucketBy`. Box `2("StoreID","Year","Month","Day","Hour")` Box 3: `.csv("/Purchases")`.
- [ ] Box 1: `.partitionBy`. Box 2: `("StoreID","Hour")`. Box 3: `.json("/Purchases")`.
- [x] Box 1: `.partitionBy`. Box 2: `("StoreID", , "Year", "Month", "Day", "Hour")`. Box 3: `.parquet(*/Purchases")`.
- [ ] Box 1: `.range`. Box 2: `("*")`. Box 3: `.saveAsTable("/Purchases")`.

### Solution: In an Azure Synapse Analytics pipeline, you use a data flow that contains a Derived Column transformation.

- [x] Yes.
- [ ] No.

### You are designing an Azure Data Lake Storage Gen2 container to store data for the human resources (HR) department and the operations department at your company. You have the following data access requirements: After initial processing, the HR department data will be retained for seven years. The operations department data will be accessed frequently for the first six months, and then accessed once per month. You need to design a data retention solution to meet the access requirements. The solution must minimize storage costs.

![Question 88](images/question88.png)

- [x] HR: Archive storage after one day and delete storage after 2,555 days. Operations: Cool storage after 180 days.
- [ ] HR: Delete after 180 days. Operations: Cool storage after one day.
- [ ] HR: Delete after 180 days. Operations: Archive storage after one day and delete storage after 2,555 days.
- [ ] HR: Cool storage after 180 days. Operations: Archive storage after 2,555 days.

### You are designing an application that will store petabytes of medical imaging data When the data is first created, the data will be accessed frequently during the first week. After one month, the data must be accessible within 30 seconds, but files will be accessed infrequently. After one year, the data will be accessed infrequently but must be accessible within five minutes. You need to select a storage strategy for the data. The solution must minimize costs. Which storage tier should you use for each time frame?

![Question 89](images/question89.jpg)

- [x] First week: Hot. After one month: Cool. After one year: Cool.
- [ ] First week: Cool. After one month: Hot. After one year: Archive.
- [ ] First week: Hot. After one month: Hot. After one year: Archive.
- [ ] First week: Cool. After one month: Archive. After one year: Hot.

### You are designing a sales transactions table in an Azure Synapse Analytics dedicated SQL pool. The table will contains approximately 60 million rows per month and will be partitioned by month. The table will use a clustered column store index and round-robin distribution. Approximately how many rows will there be for each combination of distribution and partition?

- [x] 1 million.
- [ ] 5 million.
- [ ] 20 million.
- [ ] 60 million.

### You implement an enterprise data warehouse in Azure Synapse Analytics. You have a large fact table that is 10 terabytes (TB) in size. Incoming queries use the primary key SaleKey column to retrieve data as displayed in the following table: You need to distribute the large fact table across multiple nodes to optimize performance of the table. Which technology should you use?

- [ ] hash distributed table with clustered index.
- [x] hash distributed table with clustered Columnstore index.
- [ ] round robin distributed table with clustered index.
- [ ] round robin distributed table with clustered Columnstore index.
- [ ] heap table with distribution replicate.

### You have an Azure Data Factory instance named ADF1 and two Azure Synapse Analytics workspaces named WS1 and WS2. ADF1 contains the following pipelines: P1: Uses a copy activity to copy data from a nonpartitioned table in a dedicated SQL pool of WS1 to an Azure Data Lake Storage Gen2 account P2: Uses a copy activity to copy data from text-delimited files in an Azure Data Lake Storage Gen2 account to a nonpartitioned table in a dedicated SQL pool of WS2 You need to configure P1 and P2 to maximize parallelism and performance. Which dataset settings should you configure for the copy activity if each pipeline?

![Question 92](images/question92.jpg)

- [ ] P1: Set the Copy method to Bulk insert. P2: Set the Partition option to Dynamic range.
- [ ] P1: Set the Copy method to PolyBase. P2: Set the Copy method to Bulk insert.
- [ ] P1: Set the Copy method to Bulk insert. P2: Set the Copy method to PolyBase.
- [x] P1: Set the Copy method to PolyBase. P2: Set the Copy method to Bulk insert.

### Solution: You copy the files to a table that has a columnstore index.

- [ ] Yes.
- [x] No.

### You have an Azure Data Factory pipeline that performs an incremental load of source data to an Azure Data Lake Storage Gen2 account. Data to be loaded is identified by a column named LastUpdatedDate in the source table. You plan to execute the pipeline every four hours. You need to ensure that the pipeline execution meets the following requirements: Automatically retries the execution when the pipeline run fails due to concurrency or throttling limits. Supports backfilling existing data in the table. Which type of trigger should you use?

- [ ] event.
- [ ] on-demand.
- [ ] schedule.
- [x] tumbling window.

### You plan to implement an Azure Data Lake Gen2 storage account. You need to ensure that the data lake will remain available if a data center fails in the primary Azure region. The solution must minimize costs. Which type of replication should you use for the storage account?

- [x] geo-redundant storage (GRS).
- [ ] zone-redundant storage (ZRS).
- [ ] locally-redundant storage (LRS).
- [ ] geo-zone-redundant storage (GZRS).

### You have an Azure Data Lake Storage Gen2 container. Data is ingested into the container, and then transformed by a data integration application. The data is NOT modified after that. Users can read files in the container but cannot modify the files. You need to design a data archiving solution that meets the following requirements: New data is accessed frequently and must be available as quickly as possible. Data that is older than five years is accessed infrequently but must be available within one second when requested. Data that is older than seven years is NOT accessed. After seven years, the data must be persisted at the lowest cost possible. Costs must be minimized while maintaining the required availability. How should you manage the data?

![Question 96](images/question96.jpg)

- [ ] Five-year-old data: Delete the blob. Seven-year-ild data: Move to cool storage.
- [ ] Five-year-old data: Delete the blob. Seven-year-ild data: Move to cool storage.
- [x] Five-year-old data: Move to cool storage. Seven-year-ild data: Move to archive storage.
- [ ] Five-year-old data: Delete the blob. Seven-year-ild data: Move to archive storage.

### You have an Azure Stream Analytics query. The query returns a result set that contains 10,000 distinct values for a column named clusterID. You monitor the Stream Analytics job and discover high latency. You need to reduce the latency. Which two actions should you perform?

- [ ] Add a pass-through query.
- [ ] Add a temporal analytic function.
- [x] Scale out the query by using PARTITION BY.
- [ ] Convert the query to a reference query.
- [x] Increase the number of streaming units.

### You are designing a statistical analysis solution that will use custom proprietary1 Python functions on near real-time data from Azure Event Hubs. You need to recommend which Azure service to use to perform the statistical analysis. The solution must minimize latency. What should you recommend?

- [ ] Azure Stream Analytics.
- [ ] Azure SQL Database.
- [x] Azure Databricks.
- [ ] Azure Synapse Analytics.

### You have an Azure subscription that contains the following resources: An Azure Active Directory (Azure AD) tenant that contains a security group named Group1 An Azure Synapse Analytics SQL pool named Pool1 You need to control the access of Group1 to specific columns and rows in a table in Pool1. Which Transact-SQL commands should you use?

![Question 99](images/question99.jpg)

- [ ] Ton control access to the columns: CREATE SECURITY POLICY. Tocontrol access to the rows: CREATE PARTITION FUNCTION.
- [ ] Ton control access to the columns: CREATE SECURITY POLICY.Tocontrol access to the rows: CREATE SECURITY POLICY.
- [ ] Ton control access to the columns: CREATE SECURITY POLICY. Tocontrol access to the rows: CREATE SECURITY POLICY.
- [x] Ton control access to the columns: GRANT. Tocontrol access to the rows: CREATE SECURITY POLICY.

### You have an Azure Synapse Analytics dedicated SQL pool named SA1 that contains a table named Table1. You need to identify tables that have a high percentage of deleted rows. What should you run?

- [ ] sys.pdw_nodes_column_store_segments.
- [ ] sys.dm_db_column_store_row_group_operational_stats.
- [x] sys.pdw_nodes_column_store_row_groups.
- [ ] sys.dm_bd_column_store_row_group_physical_stats.

### You have data stored in thousands of CSV files in Azure Data Lake Storage Gen2. Each file has a header row followed by a properly formatted carriage return (/r) and line feed (/n). You are implementing a pattern that batch loads the files daily into an enterprise data warehouse in Azure Synapse Analytics by using PolyBase. You need to skip the header row when you import the files into the data warehouse. Before building the loading pattern, you need to prepare the required database objects in Azure Synapse Analytics. Which three actions should you perform in sequence?

![Question 101](images/question101.jpg)

- [ ] Box 1: Create an external data source that uses the abfs location. Box 2: Use CREATE EXTERNAL TABLE AS SELECT (CETAS) and configure the reject options to specify reject values or percentages. Box 3: Create an external file format and set the Firat_Row option.
- [x] Box 1: Create an external data source that uses the abfs location. Box 2: Create an external file format and set the Firat_Row option. Box 3: Use CREATE EXTERNAL TABLE AS SELECT (CETAS) and configure the reject options to specify reject values or percentages.
- [ ] Box 1: Use CREATE EXTERNAL TABLE AS SELECT (CETAS) and configure the reject options to specify reject values or percentages. Box 2: Create an external data source that uses the abfs location. Box 3: Use CREATE EXTERNAL TABLE AS SELECT (CETAS) and configure the reject options to specify reject values or percentages.
- [ ] Box 1: Create an external file format and set the Firat_Row option. Box 2: Use CREATE EXTERNAL TABLE AS SELECT (CETAS) and configure the reject options to specify reject values or percentages. Box 3: Create an external data source that uses the abfs location.

### You have a SQL pool in Azure Synapse that contains a table named dbo.Customers. The table contains a column name Email. You need to prevent nonadministrative users from seeing the full email addresses in the Email column. The users must see values in a format of aXXX@XXXX.com instead. What should you do?

- [ ] From Microsoft SQL Server Management Studio, set an email mask on the Email column.
- [x] From the Azure portal, set a mask on the Email column.
- [ ] From Microsoft SQL Server Management studio, grant the SELECT permission to the users for all the columns in the dbo.Customers table except Email.
- [ ] From the Azure portal, set a sensitivity classification of Confidential for the Email column.

### Solution: You use an Azure Data Factory schedule trigger to execute a pipeline that executes mapping data Flow, and then inserts the data info the data warehouse.

- [ ] Yes.
- [x] No.

### You are designing an application that will use an Azure Data Lake Storage Gen 2 account to store petabytes of license plate photos from toll booths. The account will use zone-redundant storage (ZRS). You identify the following usage patterns: The data will be accessed several times a day during the first 30 days after the data is created. The data must meet an availability SU of 99.9%. After 90 days, the data will be accessed infrequently but must be available within 30 seconds. After 365 days, the data will be accessed infrequently but must be available within five minutes.

![Question 104](images/question104.png)

- [x] First 30 days: Hot. After 90 days: Cool. After 365 days: Cool.
- [ ] First 30 days: Hot. After 90 days: Archive. After 365 days: Archive.
- [ ] First 30 days: Cool. After 90 days: Cool. After 365 days: Archive.
- [ ] First 30 days: Cool. After 90 days: Hot. After 365 days: Archive.

### A company has a real-time data analysis solution that is hosted on Microsoft Azure. The solution uses Azure Event Hub to ingest data and an Azure Stream Analytics cloud job to analyze the data. The cloud job is configured to use 120 Streaming Units (SU). You need to optimize performance for the Azure Stream Analytics job. Which two actions should you perform?

- [ ] Implement event ordering.
- [ ] Implement Azure Stream Analytics user-defined functions (UDF).
- [ ] Implement query parallelization by partitioning the data output.
- [x] Scale the SU count for the job up.
- [ ] Scale the SU count for the job down.
- [x] Implement query parallelization by partitioning the data input.

### You have a Microsoft SQL Server database that uses a third normal form schema. You plan to migrate the data in the database to a star schema in an Azure Synapse Analytics dedicated SQI pool. You need to design the dimension tables. The solution must optimize read operations. What should you include in the solution?

![Question 106](images/question106.jpg)

- [x] Transform data for the dimension tables by: Denormalizing to a second normal form. For the primary key in the dimension tables, use: New IDENTITY columns.
- [ ] Transform data for the dimension tables by: Maintaining to a third normal form. For the primary key in the dimension tables, use: A new computed column.
- [ ] Transform data for the dimension tables by: Maintaining to a third normal form. For the primary key in the dimension tables, use: New IDENTITY columns.
- [ ] Transform data for the dimension tables by: Normalizing to a fourth normal form. For the primary key in the dimension tables, use: The business key column from the source sys.

### You have an Azure subscription that contains an Azure Data Lake Storage account. The storage account contains a data lake named DataLake1. You plan to use an Azure data factory to ingest data from a folder in DataLake1, transform the data, and land the data in another folder. You need to ensure that the data factory can read and write data from any folder in the DataLake1 file system. The solution must meet the following requirements: Minimize the risk of unauthorized user access. Use the principle of least privilege. Minimize maintenance effort. How should you configure access to the storage account for the data factory?

![Question 107](images/question107.jpg)

- [ ] Use: a Shared Access Signature (SAS). to authenticate by using: a stored access policy.
- [x] Use: Microsoft Azure Active Directory (Azure AD), part of Microsoft Entra. to authenticate by using: a managed identity.
- [ ] Use: a shared key. to authenticate by using: an Authorization header.
- [ ] Use: a Shared Access Signature (SAS). to authenticate by using: an Authorization header.

### You have an Azure data solution that contains an enterprise data warehouse in Azure Synapse Analytics named DW1. Several users execute ad hoc queries to DW1 concurrently. You regularly perform automated data loads to DW1. You need to ensure that the automated data loads have enough memory available to complete quickly and successfully when the adhoc queries run. What should you do?

- [ ] Hash distribute the large fact tables in DW1 before performing the automated data loads.
- [ ] Assign a smaller resource class to the automated data load queries.
- [x] Assign a larger resource class to the automated data load queries.
- [ ] Create sampled statistics for every column in each table of DW1.

### You plan to create an Azure Data Factory pipeline that will include a mapping data flow. You have JSON data containing objects that have nested arrays. You need to transform the JSON-formatted data into a tabular dataset. The dataset must have one tow for each item in the arrays. Which transformation method should you use in the mapping data flow?

- [ ] unpivot.
- [x] flatten.
- [ ] new branch.
- [ ] alter row.

### You have a C# application that process data from an Azure IoT hub and performs complex transformations. You need to replace the application with a real-time solution. The solution must reuse as much code as possible from the existing application.

- [ ] Azure Databricks.
- [ ] Azure Event Grid.
- [x] Azure Stream Analytics.
- [ ] Azure Data Factory.

### You are implementing an Azure Stream Analytics solution to process event data from devices. The devices output events when there is a fault and emit a repeat of the event every five seconds until the fault is resolved. The devices output a heartbeat event every five seconds after a previous event if there are no faults present. A sample of the events is shown in the following table. You need to calculate the uptime between the faults. How should you complete the Stream Analytics SQL query?

![Question 111](images/question111.jpg)

- [ ] Box 1: `WHERE WHERE LAG(EventType, 1) OVER (LIMIT DURATION(second, 5)) <> EventType`. Box 2: `SessionWindow(second, 5, 50000) OVER (PARTITION BY DeviceID)`.
- [ ] Box 1: `WHERE EventType='HeartBeat'`. Box 2: `SessionWindow(second, 5, 50000) OVER (PARTITION BY DeviceID)`.
- [x] Box 1: `WHERE EventType='HeartBeat'`. Box 2: `TumblingWindow(second, 5)`.
- [ ] Box 1: `WHERE IsFirst(second, 5) = 1`. Box 2: `HAVING DATEDIFF(second, MINE(EventTime), MAX(EventTime)) > 5`.

### You are designing an Azure Stream Analytics solution that receives instant messaging data from an Azure Event Hub. You need to ensure that the output from the Stream Analytics job counts the number of messages per time zone every 15 seconds. How should you complete the Stream Analytics query?

![Question 112](images/question112.jpg)

- [ ] `FROM MessageStream`: `LAST`. `GROUP BY TimeZone,`: `HOPPINGWINDOW`.
- [ ] `FROM MessageStream`: `OVER`. `GROUP BY TimeZone,`: `SESSIONWINDOW`.
- [ ] `FROM MessageStream`: `SYSTEM.TIMESTAMP()`. `GROUP BY TimeZone,`: `SLIDINGWINDOW`.
- [x] `FROM MessageStream`: `TIMESTAMP BY`. `GROUP BY TimeZone,`: `TUMBLINGWINDOW`.

### You have an Azure Databricks workspace named workspace! in the Standard pricing tier. Workspace! contains an all-purpose cluster named cluster. You need to reduce the time it takes for cluster 1 to start and scale up. The solution must minimize costs. What should you do first?

- [ ] Upgrade workspace! to the Premium pricing tier.
- [ ] Create a cluster policy in workspace1.
- [x] Create a pool in workspace1.
- [ ] Configure a global init script for workspace1.

### You have an Azure Data Lake Storage Gen2 account that contains a JSON file for customers. The file contains two attributes named FirstName and LastName. You need to copy the data from the JSON file to an Azure Synapse Analytics table by using Azure Databricks. A new column must be created that concatenates the FirstName and LastName values. You create the following components: A destination table in Azure Synapse An Azure Blob storage container A service principal Which five actions should you perform in sequence next in is Databricks notebook?

![Question 114](images/question114.jpg)

- [ ] Box 1: Read the file into a data frame. Box 2: Write the results to a table in Azure Synapse. Box 3: Write the results to a table in Azure Synapse. Box 4: Mount the Data Lake Storage onto DBFS. Box 5: Mount the Data Lake Storage onto DBFS.
- [ ] Box 1: Perform transformations on the data frame. Box 2: Write the results to a table in Azure Synapse. Box 3: Mount the Data Lake Storage onto DBFS. Box 4: Specify a temporary folder to stage the data. Box 5: Perform transformations on the data frame.
- [x] Box 1: Mount the Data Lake Storage onto DBFS. Box 2: Read the file into a data frame. Box 3: Perform transformations on the data frame. Box 4: Specify a temporary folder to stage the data. Box 5: Write the results to a table in Azure Synapse.
- [ ] Box 1: Perform transformations on the data frame. Box 2: Read the file into a data frame. Box 3: Write the results to a table in Azure Synapse. Box 4: Specify a temporary folder to stage the data. Box 5: Mount the Data Lake Storage onto DBFS.

### You have an Azure event hub named retailhub that has 16 partitions. Transactions are posted to retailhub. Each transaction includes the transaction ID, the individual line items, and the payment details. The transaction ID is used as the partition key. You are designing an Azure Stream Analytics job to identify potentially fraudulent transactions at a retail store. The job will use retailhub as the input. The job will output the transaction ID, the individual line items, the payment details, a fraud score, and a fraud indicator. You plan to send the output to an Azure event hub named fraudhub. You need to ensure that the fraud detection solution is highly scalable and processes transactions as quickly as possible. How should you structure the output of the Stream Analytics job?

![Question 115](images/question115.jpg)

- [ ] Number of partitions: 32. Partition key: Transaction ID.
- [ ] Number of partitions: 1. Partition key: Fraud indicator.
- [ ] Number of partitions: 8. Partition key: Fraud score.
- [x] Number of partitions: 16. Partition key: Transaction ID.

### You have an Azure Storage account that generates 200,000 new files daily. The file names have a format of {YYYY}/{MM}/{DD}/{HH}/{CustomerID}.csv. You need to design an Azure Data Factory solution that will load new data from the storage account to an Azure Data Lake once hourly. The solution must minimize load times and costs. How should you configure the solution?

![Question 116](images/question116.jpg)

- [x] Load methodology: Incremental Load. Trigger: Tumbling window.
- [ ] Load methodology: Full Load. Trigger: Tumbling window.
- [ ] Load methodology: Incremental Load. Trigger: Fixed schedule.
- [ ] Load methodology: Load Individual files as they arrive. Trigger: New file.

### You plan to implement an Azure Data Lake Storage Gen2 container that will contain CSV files. The size of the files will vary based on the number of events that occur per hour. File sizes range from 4.KB to 5 GB. You need to ensure that the files stored in the container are optimized for batch processing. What should you do?

- [ ] Compress the files.
- [x] Merge the files.
- [ ] Convert the files to JSON
- [ ] Convert the files to Avro.

### You are developing a solution using a Lambda architecture on Microsoft Azure. The data at test layer must meet the following requirements: Data storage: Serve as a repository or high volumes of large files in various formats. Implement optimized storage for big data analytics workloads. Ensure that data can be organized using a hierarchical structure. Batch processing: Use a managed solution for in-memory computation processing. Natively support Scala, Python, and R programming languages. Provide the ability to resize and terminate the cluster automatically. Analytical data store: Support parallel processing. Use columnar storage. Support SQL-based languages. You need to identify the correct technologies to build the Lambda architecture. Which technologies should you use?

![Question 118](images/question118.jpg)

- [x] Data storage: Azure Data Lake Store. Batch processing: HDInsight Spark. Analytical data store: Azure Synapse Analytics.
- [ ] Data storage: Azure SQL Database. Batch processing: HDInsight Hadoop. Analytical data store: HDInsinght HBase.
- [ ] Data storage: Azure Blob Storage. Batch processing: Azure Databricks. Analytical data store: Azure Analysis Services.
- [ ] Data storage: Azure Data Lake Store. Batch processing: HDInsight Interactive Query. Analytical data store: Azure Cosmos DB.

### A company plans to use Platform-as-a-Service (PaaS) to create the new data pipeline process. The process must meet the following requirements: Ingest: Access multiple data sources. Provide the ability to orchestrate workflow. Provide the capability to run SQL Server Integration Services packages. Store: Optimize storage for big data workloads. Provide encryption of data at rest. Operate with no size limits. Prepare and Train: Provide a fully-managed and interactive workspace for exploration and visualization. Provide the ability to program in R, SQL, Python, Scala, and Java. Provide seamless user authentication with Azure Active Directory. Model & Serve: Implement native columnar storage. Support for the SQL language Provide support for structured streaming. You need to build the data integration pipeline. Which technologies should you use?

![Question 119](images/question119.jpg)

- [ ] Ingest: Logic Apps. Store: Azure Data Lake Storage. Prepare and Train: HDInsight Apache Spark cluster. Model and Serve: HDInsight Apache Kafka cluster.
- [ ] Ingest: Azure Data Factory. Store: Azure Blob Storage. Prepare and Train: Azure Databricks. Model and Serve: Azure Synapse Analytics.
- [x] Ingest: Azure Data Factory. Store: Azure Data Lake Storage. Prepare and Train: Azure Databricks. Model and Serve: Azure Databricks.
- [ ] Ingest: Azure Automation. Store: Azure files. Prepare and Train: HDInsight Apache Storm cluster. Model and Serve: Azure Data Lake Storage.

### From a website analytics system, you receive data extracts about user interactions such as downloads, link clicks, form submissions, and video plays. The data contains the following columns. You need to design a star schema to support analytical queries of the data. The star schema will contain four tables including a date dimension. To which table should you add each column?

![Question 120](images/question120.jpg)

- [ ] EventCategory: DimChannel. ChannelGrouping: FactEvents. TotalEvents: FactEvents.
- [x] EventCategory: DimEvent. ChannelGrouping: DimChannel. TotalEvents: FactEvents.
- [ ] EventCategory: FactEvents. ChannelGrouping: DimEvent. TotalEvents: DimEvent.
- [ ] EventCategory: FactEvents. ChannelGrouping: DimChannel. TotalEvents: DimEvent.

### You have a table named SalesFact in an enterprise data warehouse in Azure Synapse Analytics. SalesFact contains sales data from the past 36 months and has the following characteristics: Is partitioned by month Contains one billion rows Has clustered columnstore indexes At the beginning of each month, you need to remove data from SalesFact that is older than 36 months as quickly as possible. Which three actions should you perform in sequence in a stored procedure?

![Question 121](images/question121.jpg)

- [ ] Box 1: Switch the partition containing the stale data from SalesFact to SalesFact_Work. Box 2: Drop the SalesFact_Work table. Box 3: Switch the partition containing the stale data from SalesFact to SalesFact_Work.
- [ ] Box 1: Drop the SalesFact_Work table. Box 2: Create an empty table named SalesFact_Work that has the same schema as SalesFact. Box 3: Drop the SalesFact_Work table.
- [x] Box 1: Create an empty table named SalesFact_Work that has the same schema as SalesFact. Box 2: Switch the partition containing the stale data from SalesFact to SalesFact_Work. Box 3: Drop the SalesFact_Work table.
- [ ] Box 1: Switch the partition containing the stale data from SalesFact to SalesFact_Work. Box 2: Create an empty table named SalesFact_Work that has the same schema as SalesFact. Box 3: Create an empty table named SalesFact_Work that has the same schema as SalesFact.

### You are responsible for providing access to an Azure Data Lake Storage Gen2 account. Your user account has contributor access to the storage account, and you have the application ID and access key. You plan to use PolyBase to load data into an enterprise data warehouse in Azure Synapse Analytics. You need to configure PolyBase to connect the data warehouse to storage account. Which three components should you create in sequence?

![Question 122](images/question122.jpg)

- [ ] Box 1: an external data source. Box 2: a database scoped credential. Box 3: an external file format.
- [ ] Box 1: an external file format. Box 2: an external data source. Box 3: a database scoped credential.
- [x] Box 1: an asymetric key. Box 2: a database scoped credential. Box 3: an external data source.
- [ ] Box 1: a database scoped credential. Box 2: an external data source. Box 3: an external file format.

### You have a data warehouse in Azure Synapse Analytics. You need to ensure that the data in the data warehouse is encrypted at rest. What should you enable? What should you enable?

- [ ] Advanced Data Security for this database.
- [x] Transparent Data Encryption (TDE).
- [ ] Secure transfer required.
- [ ] Dynamic Data Masking.

### You are designing a date dimension table in an Azure Synapse Analytics dedicated SQL pool. The date dimension table will be used by all the fact tables. Which distribution type should you recommend to minimize data movement?

- [ ] HASH.
- [x] REPLICATE.
- [ ] ROUND ROBIN.

### You plan to monitor an Azure data factory by using the Monitor & Manage app. You need to identify the status and duration of activities that reference a table in a source database. Which three actions should you perform in sequence?

![Question 125](images/question125.jpg)

- [x] Box 1: From the Data Factory authoring Ul, generate a user property for Source on all activities. Box 2: From the Data Factory monitoring app, add the Source user property to the Pipeline Runs table. Box 3: From the Data Factory authoring Ul, publish the pipelines.
- [ ] Box 1: From the Data Factory authoring Ul, publish the pipelines. Box 2: From the Data Factory authoring Ul, publish the pipelines. Box 3: From the Data Factory authoring Ul, generate a user property for Source on all activities.
- [ ] Box 1: From the Data Factory authoring Ul, generate a user property for Source on all activities. Box 2: From the Data Factory monitoring app, add the Source user property to the Pipeline Runs table. Box 3: From the Data Factory authoring Ul, generate a user property for Source on all activities.
- [ ] Box 1: From the Data Factory authoring Ul, publish the pipelines. Box 2: From the Data Factory authoring Ul, generate a user property for Source on all activities. Box 3: From the Data Factory monitoring app, add the Source user property to the Pipeline Runs table.

### You are processing streaming data from vehicles that pass through a toll booth. You need to use Azure Stream Analytics to return the license plate, vehicle make, and hour the last vehicle passed during each 10-minute window. How should you complete the query?

![Question 126](images/question126.jpg)

- [ ] Box 1: `COUNT`. Box 2: `HoppingWindow`. Box 3: `DATEADD`.
- [ ] Box 1: `MIN`. Box 2: `SessionWindow`. Box 3: `DATEPART`.
- [ ] Box 1: `TOPONE`. Box 2: `SlidingWindow`. Box 3: `DATENAME`.
- [x] Box 1: `MAX`. Box 2: `TumblingWindow`. Box 3: `DATEDIFF`.

### You are implementing Azure Stream Analytics windowing functions. Which windowing function should you use for each requirement?

![Question 127](images/question127.jpg)

- [ ] Segment the data stream into distinct time segments that repeat but do not overlap: Sliding. Segment the data stream into distinct time segments that repeat and can overlap: Hopping. Segment the data stream to produce an output only when an event occurs: Tumbling.
- [x] Segment the data stream into distinct time segments that repeat but do not overlap: Tumbling. Segment the data stream into distinct time segments that repeat and can overlap: Hopping. Segment the data stream to produce an output only when an event occurs: Hopping.
- [ ] Segment the data stream into distinct time segments that repeat but do not overlap: Hopping. Segment the data stream into distinct time segments that repeat and can overlap: Sliding. Segment the data stream to produce an output only when an event occurs: Tumbling.
- [ ] Segment the data stream into distinct time segments that repeat but do not overlap: Sliding. Segment the data stream into distinct time segments that repeat and can overlap: Tumbling. Segment the data stream to produce an output only when an event occurs: Hopping.

### You need to create an Azure Data Factory pipeline to process data for the following three departments at your company: Ecommerce, retail, and wholesale. The solution must ensure that data can also be processed for the entire company. How should you complete the Data Factory data flow script?

![Question 128](images/question128.jpg)

- [ ] Box 1: `dept=='ecommerce', dept=='retail', dept-- 'wholesale'`. Box 2: `disjoint: false`. Box 3: `ecommerce, retail, wholesale, all`.
- [ ] Box 1: `ecommerce, retail, wholesale, all`. Box 2: `disjoint: false`. Box 3: `dept=='ecommerce', dept=='retail', dept-- 'wholesale'`.
- [x] Box 1: `dept=='ecommerce', dept=='retail', dept-- 'wholesale'`. Box 2: `disjoint: true`. Box 3: `ecommerce, retail, wholesale, all`.
- [ ] Box 1: `dept=='ecommerce', dept=='wholesale', dept-- 'retail'`. Box 2: `disjoint: true`. Box 3: `ecommerce, retail, wholesale, all`.

### You have a data model that you plan to implement in a data warehouse in Azure Synapse Analytics as shown in the following exhibit. All the dimension tables will be less than 2 GB after compression, and the fact table will be approximately 6 TB. Which type of table should you use for each table?

![Question 129](images/question129.jpg)

- [ ] Dim_Customer: Replicated. Dim_Employee: Hash distributed. Dim_Time: Round-robin. Fact_DailyBookings: Replicated.
- [ ] Dim_Customer: Round-robin. Dim_Employee: Round-robin. Dim_Time: Round-robin. Fact_DailyBookings: Round-robin.
- [x] Dim_Customer: Replicated. Dim_Employee: Replicated. Dim_Time: Replicated. Fact_DailyBookings: Hash distributed.
- [ ] Dim_Customer: Round-robin. Dim_Employee: Hash distributed. Dim_Time: Round-robin. Fact_DailyBookings: Replicated.

### You are designing an enterprise data warehouse in Azure Synapse Analytics that will contain a table named Customers. Customers will contain credit card information. You need to recommend a solution to provide salespeople with the ability to view all the entries in Customers. The solution must prevent all the salespeople from viewing or inferring the credit card information. What should you include in the recommendation?

- [ ] data masking.
- [ ] Always Encrypted.
- [x] column-level security.
- [ ] row-level security.

### You have an enterprise data warehouse in Azure Synapse Analytics. You need to monitor the data warehouse to identify whether you must scale up to a higher service level to accommodate the current workloads Which is the best metric to monitor?

- [ ] Data 10 percentage.
- [ ] CPU percentage.
- [ ] DWU used.
- [x] DWU percentage.

### A company plans to use Apache Spark analytics to analyze intrusion detection data. You need to recommend a solution to analyze network and system activity data for malicious activities and policy violations. The solution must minimize administrative efforts. What should you recommend?

- [ ] Azure Data Lake Storage.
- [x] Azure Databricks.
- [ ] Azure HDInsight.
- [ ] Azure Data Factory.

### You have an Azure Factory instance named DF1 that contains a pipeline named PL1.PL1 includes a tumbling window trigger. You create five clones of PL1. You configure each clone pipeline to use a different data source. You need to ensure that the execution schedules of the clone pipeline match the execution schedule of PL1. What should you do?

- [ ] Add a new trigger to each cloned pipeline.
- [x] Associate each cloned pipeline to an existing trigger.
- [ ] Create a tumbling window trigger dependency for the trigger of PL1.
- [ ] Modify the Concurrency setting of each pipeline.

### You are designing a streaming data solution that will ingest variable volumes of data. You need to ensure that you can change the partition count after creation. Which service should you use to ingest the data?

- [x] Azure Event Hubs Dedicated.
- [ ] Azure Stream Analytics.
- [ ] Azure Data Factory.
- [ ] Azure Synapse Analytics.

### You have the following Azure Data Factory pipelines ingest Data from System 1 Ingest Data from System2 Populate Dimensions Populate facts ingest Data from System1 and Ingest Data from System1 have no dependencies. Populate Dimensions must execute after Ingest Data from System1 and Ingest Data from System* Populate Facts must execute after the Populate Dimensions pipeline. All the pipelines must execute every eight hours. What should you do to schedule the pipelines for execution?

- [ ] Add an event trigger to all four pipelines.
- [ ] Create a parent pipeline that contains the four pipelines and use an event trigger.
- [x] Create a parent pipeline that contains the four pipelines and use a schedule trigger.
- [ ] Add a schedule trigger to all four pipelines.

### You have an Azure Synapse Analytics serverless SQL pool named Pool1 and an Azure Data Lake Storage Gen2 account named storage1. The AllowedBlobpublicAccess porperty is disabled for storage1. You need to create an external data source that can be used by Azure Active Directory (Azure AD) users to access storage1 from Pool1. What should you create first?

- [ ] an external resource pool
- [ ] a remote service binding
- [x] database scoped credentials
- [ ] an external library

### You need to schedule an Azure Data Factory pipeline to execute when a new file arrives in an Azure Data Lake Storage Gen2 container. Which type of trigger should you use?

- [ ] on-demand
- [ ] tumbling window
- [ ] schedule
- [x] event

### You are building an Azure Analytics query that will receive input data from Azure IoT Hub and write the results to Azure Blob storage. You need to calculate the difference in readings per sensor per hour. How should you complete the query?

![Question 138](images/question138.jpg)

- [ ] Box 1: `LAG`. Box 2: `OFFSET`.
- [x] Box 1: `LAG`. Box 2: `LIMIT DURATION`.
- [ ] Box 1: `LAST`. Box 2: `OFFSET`.
- [ ] Box 1: `LEAD`. Box 2: `WHEN`.

### You use Azure Data Factory to prepare data to be queried by Azure Synapse Analytics serverless SQL pools. Files are initially ingested into an Azure Data Lake Storage Gen2 account as 10 small JSON files. Each file contains the same data attributes and data from a subsidiary of your company. You need to move the files to a different folder and transform the data to meet the following requirements: Provide the fastest possible query times. Automatically infer the schema from the underlying files. How should you configure the Data Factory copy activity?

![Question 139](images/question139.jpg)

- [ ] Copy behavior: Merge files. Sink file type: CSV.
- [x] Copy behavior: Preserve hierarchy. Sink file type: Parquet.
- [ ] Copy behavior: Merge files. Sink file type: Parquet.
- [ ] Copy behavior: Preserve hierarchy. Sink file type: JSON.

### You have an Azure data factory. You need to ensure that pipeline-run data is retained for 120 days. The solution must ensure that you can query the data by using the Kusto query language. Which four actions should you perform in sequence?

![Question 140](images/question140.jpg)

- [ ] Box 1: From the Azure portal, add a diagnostic setting. Box 2: Create an Azure Storage account that| has a lifecycle policy. Box 3: Send the data to a Log Analytics workspace. Box 4: Send the data to a Log Analytics workspace.
- [ ] Box 1: Send the data to a Log Analytics workspace. Box 2: From the Azure portal, add a diagnostic setting. Box 3: Send the data to a Log Analytics workspace. Box 4: From the Azure portal, add a diagnostic setting.
- [x] Box 1: Create an Azure Storage account that| has a lifecycle policy. Box 2: Create a Log Analytics workspace that has Data Retention set to 120 days. Box 3: From the Azure portal, add a diagnostic setting. Box 4: Send the data to a Log Analytics workspace.
- [ ] Box 1: Create a Log Analytics workspace that has Data Retention set to 120 days. Box 2: Create an Azure Storage account that| has a lifecycle policy. Box 3: Create an Azure Storage account that| has a lifecycle policy. Box 4: From the Azure portal, add a diagnostic setting.

### You need to collect application metrics, streaming query events, and application log messages for an Azure Databrick cluster. Which type of library and workspace should you implement?

![Question 141](images/question141.jpg)

- [ ] Library: Microsoft Azure Management Monitoring Library. Workspace: Azure Machine Learning.
- [x] Library: Azure Databricks Monitoring Library. Workspace: Azure Log Analytics.
- [ ] Library: PyTorch. Workspace: Azure Databricks.
- [ ] Library: TensorFlow. Workspace: Azure Machine Learning.

### What should you recommend to prevent users outside the Litware on-premises network from accessing the analytical data store?

- [ ] a server-level virtual network rule.
- [ ] a database-level virtual network rule.
- [ ] a database-level firewall IP rule.
- [x] a server-level firewall IP rule.

### You develop data engineering solutions for a company. A project requires the deployment of data to Azure Data Lake Storage. You need to implement role-based access control (RBAC) so that project members can manage the Azure Data Lake Storage resources. Which three actions should you perform?

- [x] Assign Azure AD security groups to Azure Data Lake Storage.
- [ ] Configure end-user authentication for the Azure Data Lake Storage account.
- [ ] Configure service-to-service authentication for the Azure Data Lake Storage account.
- [x] Create security groups in Azure Active Directory (Azure AD) and add project members.
- [x] Configure access control lists (ACL) for the Azure Data Lake Storage account.

### You are designing a real-time dashboard solution that will visualize streaming data from remote sensors that connect to the internet. The streaming data must be aggregated to show the average value of each 10-second interval. The data will be discarded after being displayed in the dashboard. The solution will use Azure Stream Analytics and must meet the following requirements: Minimize latency from an Azure Event hub to the dashboard. Minimize the required storage. Minimize development effort. What should you include in the solution?

![Question 144](images/question144.jpg)

- [ ] Azure Stream Analytics input type: Azure Stream Analytics. Azure Stream Analytics output type: Azure Event Hub. Aggregation query location: Microsoft Power BI.
- [ ] Azure Stream Analytics input type: Azure Stream Analytics. Azure Stream Analytics output type: Azure Stream Analytics. Aggregation query location: Azure Event Hub.
- [ ] Azure Stream Analytics input type: Microsoft Power BI.Azure Stream Analytics output type: Azure Event Hub. Aggregation query location: Azure Event Hub.
- [x] Azure Stream Analytics input type: Azure Event Hub. Azure Stream Analytics output type: Microsoft Power BI. Aggregation query location: Azure Stream Analytics.

### You have an Azure Synapse workspace named MyWorkspace that contains an Apache Spark database named mytestdb. You run the following command in an Azure Synapse Analytics Spark pool in MyWorkspace. CREATE TABLE mytestdb.myParquetTable( EmployeeID int, EmployeeName string, EmployeeStartDate date) USING Parquet You then use Spark to insert a row into mytestdb.myParquetTable. The row contains the following data. One minute later, you execute the following query from a serverless SQL pool in MyWorkspace. SELECT EmployeeID FROM mytestdb.dbo.myParquetTable WHERE name = 'Alice'; What will be returned by the query?

- [x] 24.
- [ ] an error.
- [ ] a null value.

### You have a SQL pool in Azure Synapse. You plan to load data from Azure Blob storage to a staging table. Approximately 1 million rows of data will be loaded daily. The table will be truncated before each daily load. You need to create the staging table. The solution must minimize how long it takes to load the data to the staging table. How should you configure the table?

![Question 146](images/question146.jpg)

- [x] Distribution: Hash. Indexing: Clustered columnstore. Partitioning: Date.
- [ ] Distribution: Replicated. Indexing: Clustered. Partitioning: Date.
- [ ] Distribution: Replicated. Indexing: Heap. Partitioning: None.
- [ ] Distribution: Round-robin. Indexing: Clustered. Partitioning: None.

### You are designing a partition strategy for a fact table in an Azure Synapse Analytics dedicated SQL pool. The table has the following specifications: Contain sales data for 20,000 products. Use hash distribution on a column named ProduclID, Contain 2.4 billion records for the years 20l9 and 2020. Which number of partition ranges provides optimal compression and performance of the clustered columnstore index?

- [x] 40.
- [ ] 240.
- [ ] 400.
- [ ] 2,400.

### You use Azure Data Lake Storage Gen2. You need to ensure that workloads can use filter predicates and column projections to filter data at the time the data is read from disk. Which two actions should you perform?

- [ ] Reregister the Microsoft Data Lake Store resource provider.
- [ ] Reregister the Azure Storage resource provider.
- [ ] Create a storage policy that is scoped to a container.
- [x] Register the query acceleration feature.
- [x] Create a storage policy that is scoped to a container prefix filter.

### You have an Azure Synapse Analystics dedicated SQL pool that contains a table named Contacts. Contacts contains a column named Phone. You need to ensure that users in a specific role only see the last four digits of a phone number when querying the Phone column. What should you include in the solution?

- [ ] a default value.
- [x] dynamic data masking.
- [ ] row-level security (RLS).
- [ ] column encryption.
- [ ] table partitions.

### You have an Azure Synapse Analytics dedicated SQL pool. You need to ensure that data in the pool is encrypted at rest. The solution must NOT require modifying applications that query the data. What should you do?

- [ ] Enable encryption at rest for the Azure Data Lake Storage Gen2 account.
- [x] Enable Transparent Data Encryption (TDE) for the pool.
- [ ] Use a customer-managed key to enable double encryption for the Azure Synapse workspace.
- [ ] Create an Azure key vault in the Azure subscription grant access to the pool.

### You build an Azure Data Factory pipeline to move data from an Azure Data Lake Storage Gen2 container to a database in an Azure Synapse Analytics dedicated SQL pool. Data in the container is stored in the following folder structure. /in/{YYYY}/{MM}/{DD}/{HH}/{mm} The earliest folder is /in/2021/01/01/00/00. The latest folder is /in/2021/01/15/01/45. You need to configure a pipeline trigger to meet the following requirements: Existing data must be loaded. Data must be loaded every 30 minutes. Late-arriving data of up to two minutes must he included in the load for the time at which the data should have arrived. How should you configure the pipeline trigger?

![Question 151](images/question151.jpg)

- [x] Type: Tumbling window. Additional properties: Recurrence: 30 minutes, Start time: 2021-01-01T00:00, Delay: 2 minutes.
- [ ] Type: Schedule. Additional properties: Recurrence: 30 minutes, Start time: 2021-01-01T00:00, Delay: 2 minutes.
- [ ] Type: Schedule. Additional properties: Prefix: /in/, Event: created.
- [ ] Type: On-demand. Additional properties: Recurrence: 30 minutes, Start time: 2021-01-01T00:00.

### You are creating an Azure Data Factory data flow that will ingest data from a CSV file, cast columns to specified types of data, and insert the data into a table in an Azure Synapse Analytic dedicated SQL pool. The CSV file contains three columns named username, comment, and date. The data flow already contains the following: A source transformation. A Derived Column transformation to set the appropriate types of data. A sink transformation to land the data in the pool. You need to ensure that the data flow meets the following requirements: All valid rows must be written to the destination table. Truncation errors in the comment column must be avoided proactively. Any rows containing comment values that will cause truncation errors upon insert must be written to a file in blob storage. Which two actions should you perform?

- [x] To the data flow, add a sink transformation to write the rows to a file in blob storage.
- [x] To the data flow, add a Conditional Split transformation to separate the rows that will cause truncation errors.
- [ ] To the data flow, add a filter transformation to filter out rows that will cause truncation errors.
- [ ] Add a select transformation to select only the rows that will cause truncation errors.

### You have an enterprise-wide Azure Data Lake Storage Gen2 account. The data lake is accessible only through an Azure virtual network named VNET1. You are building a SQL pool in Azure Synapse that will use data from the data lake. Your company has a sales team. All the members of the sales team are in an Azure Active Directory group named Sales. POSIX controls are used to assign the Sales group access to the files in the data lake. You plan to load data to the SQL pool every hour. You need to ensure that the SQL pool can load the sales data from the data lake. Which three actions should you perform?

- [x] Add the managed identity to the Sales group.
- [x] Use the managed identity as the credentials for the data load process.
- [ ] Create a Shared Access Signature (SAS).
- [ ] Add your Azure Active Directory (Azure AD) account to the Sales group.
- [ ] Use the Shared Access Signature (SAS) as the credentials for the data load process.
- [x] Create a managed identity.

### You are planning a streaming data solution that will use Azure Databricks. The solution will stream sales transaction data from an online store. The solution has the following specifications: The output data will contain items purchased, quantity, line total sales amount, and line total tax amount. Line total sales amount and line total tax amount will be aggregated in Databricks. Sales transactions will never be updated. Instead, new rows will be added to adjust a sale. You need to recommend an output mode for the dataset that will be processed by using Structured Streaming. The solution must minimize duplicate data. What should you recommend?

- [x] Append.
- [ ] Update.
- [ ] Complete.

### A company purchases IoT devices to monitor manufacturing machinery. The company uses an IoT appliance to communicate with the IoT devices. The company must be able to monitor the devices in real-time. You need to design the solution. What should you recommend?

- [x] Azure Stream Analytics cloud job using Azure PowerShell.
- [ ] Azure Analysis Services using Azure Portal.
- [ ] Azure Data Factory instance using Azure Portal.
- [ ] Azure Analysis Services using Azure PowerShell.

### You need to design an Azure Synapse Analytics dedicated SQL pool that meets the following requirements: Can return an employee record from a given point in time. Maintains the latest employee information. Minimizes query complexity. How should you model the employee data?

- [ ] as a temporal table.
- [ ] as a SQL graph table.
- [ ] as a degenerate dimension table.
- [x] as a Type 2 slowly changing dimension (SCD) table.

### You have an Azure subscription that contains a logical Microsoft SQL server named Server1. Server1 hosts an Azure Synapse Analytics SQL dedicated pool named Pool1. You need to recommend a Transparent Data Encryption (TDE) solution for Server1. The solution must meet the following requirements: Track the usage of encryption keys. Maintain the access of client apps to Pool1 in the event of an Azure datacenter outage that affects the availability of the encryption keys. What should you include in the recommendation?

![Question 157](images/question157.jpg)

- [x] To track encryption key usage: Always Encrypted. To maintain client app access in the event of a datacenter outage: Create and configure Azure key vaults in two Azure regions.
- [ ] To track encryption key usage: TDE with customer-managed keys. To maintain client app access in the event of a datacenter outage: Create and configure Azure key vaults in two Azure regions.
- [ ] To track encryption key usage: TDE with customer-managed keys. To maintain client app access in the event of a datacenter outage: .NET Framework data provider.
- [ ] To track encryption key usage: TDE with platform-managed keys. To maintain client app access in the event of a datacenter outage: Enable Advanced Data Security on Server1.

### You have an enterprise data warehouse in Azure Synapse Analytics named DW1 on a server named Server1. You need to verify whether the size of the transaction log file for each distribution of DW1 is smaller than 160 GB. What should you do?

- [x] On the master database, execute a query against the sys.dm_pdw_nodes_os_performance_counters dynamic management view.
- [ ] From Azure Monitor in the Azure portal, execute a query against the logs of DW1.
- [ ] On DW1, execute a query against the sys.database_files dynamic management view.
- [ ] Execute a query against the logs of DW1 by using the Get-AzOperationalInsightSearchResult PowerShell cmdlet.

### You have a SQL pool in Azure Synapse. A user reports that queries against the pool take longer than expected to complete. You need to add monitoring to the underlying storage to help diagnose the issue. Which two metrics should you monitor?

- [x] Cache used percentage.
- [ ] DWU Limit.
- [ ] Snapshot Storage Size.
- [ ] Active queries.
- [x] Cache hit percentage.

### You have an Apache Spark DataFrame named temperatures. A sample of the data is shown in the following table. You need to produce the following table by using a Spark SQL query. How should you complete the query?

![Question 160](images/question160.jpg)

- [x] Box 1: `PIVOT`. Box 2: `CAST`.
- [ ] Box 1: `COLLATE`. Box 2: `UNPIVOT`.
- [ ] Box 1: `CONVERT`. Box 2: `COLLATE`.
- [ ] Box 1: `FLATTEN`. Box 2: `PIVOT`.

### You are building a database in an Azure Synapse Analytics serverless SQL pool. You have data stored in Parquet files in an Azure Data Lake Storage Gen2 container. Records are structured as shown in the following sample. { "id": 123,\ "address_housenumber": "19c", "address_line": "Memory Lane", "applicant1_name": "Jane", "applicant2_name": "Dev" } The records contain two applicants at most. You need to build a table that includes only the address fields. How should you complete the Transact-SQL statement?

![Question 161](images/question161.jpg)

- [ ] Box 1: `CREATE TABLE`. Box 2: `CROSS APPLY`.
- [x] Box 1: `CREATE EXTERNAL TABLE`. Box 2: `OPENROWSET`.
- [ ] Box 1: `CREATE VIEW`. Box 2: `OPENJSON`.
- [ ] Box 1: `CREATE EXTERNAL TABLE`. Box 2: `OPENROWSET`.

### You have an Azure Synapse Analytics job that uses Scala. You need to view the status of the job. What should you do?

- [ ] From Azure Monitor, run a Kusto query against the AzureDiagnostics table.
- [ ] From Azure Monitor, run a Kusto query against the SparkLogying1 Event.CL table.
- [x] From Synapse Studio, select the workspace. From Monitor, select Apache Sparks applications.
- [ ] From Synapse Studio, select the workspace. From Monitor, select SQL requests.

### You have a partitioned table in an Azure Synapse Analytics dedicated SQL pool. You need to design queries to maximize the benefits of partition elimination. What should you include in the Transact-SQL queries?

- [ ] JOIN.
- [x] WHERE.
- [ ] DISTINCT.
- [ ] GROUP BY.

### You have an Azure Data Factory version 2 (V2) resource named Df1. Df1 contains a linked service. You have an Azure Key vault named vault1 that contains an encryption key named key1. You need to encrypt Df1 by using key1. What should you do first?

- [ ] Add a private endpoint connection to vaul 1.
- [ ] Enable Azure role-based access control on vault 1.
- [x] Remove the linked service from Df1.
- [ ] Create a self-hosted integration runtime.

### You plan to create a dimension table in Azure Synapse Analytics that will be less than 1 GB. You need to create the table to meet the following requirements: Provide the fastest Query time. Minimize data movement during queries. Which type of table should you use?

- [ ] hash distributed.
- [ ] heap.
- [x] replicated.
- [ ] round-robin.

### You have an Azure Databricks workspace and an Azure Data Lake Storage Gen2 account named storage! New files are uploaded daily to storage1. Incrementally process new files as they are upkorage1 as a structured streaming source. The solution must meet the following requirements: Minimize implementation and maintenance effort. Minimize the cost of processing millions of files. Support schema inference and schema drift. Which should you include in the recommendation?

- [x] Auto Loader.
- [ ] Apache Spark FileStreamSource.
- [ ] COPY INTO.
- [ ] Azure Data Factory.

### You have a table in an Azure Synapse Analytics dedicated SQL pool. The table was created by using the following Transact-SQL statement. You need to alter the table to meet the following requirements: Ensure that users can identify the current manager of employees. Support creating an employee reporting hierarchy for your entire company. Provide fast lookup of the managers' attributes such as name and job title. Which column should you add to the table?

- [ ] [ManagerEmployeeID] [int] NULL
- [ ] [ManagerEmployeeID] [smallint] NULL
- [x] [ManagerEmployeeKey] [int] NULL
- [ ] [ManagerName] [varchar](200) NULL

### A company uses Azure Stream Analytics to monitor devices. The company plans to double the number of devices that are monitored. You need to monitor a Stream Analytics job to ensure that there are enough processing resources to handle the additional load. Which metric should you monitor?

- [ ] Early Input Events.
- [ ] Late Input Events.
- [x] Watermark delay.
- [ ] Input Deserialization Errors.

### You plan to build a structured streaming solution in Azure Databricks. The solution will count new events in five-minute intervals and report only events that arrive during the interval. The output will be sent to a Delta Lake table. Which output mode should you use?

- [ ] complete.
- [ ] update.
- [x] append.

### You have an Azure Data Lake Storage Gen2 account that contains two folders named Folder and Folder2. You use Azure Data Factory to copy multiple files from Folder1 to Folder2. You receive the following error. What should you do to resolve the error.

- [ ] Add an explicit mapping.
- [ ] Enable fault tolerance to skip incompatible rows.
- [ ] Lower the degree of copy parallelism.
- [x] Change the Copy activity setting to Binary Copy.

### You are designing an Azure Stream Analytics job to process incoming events from sensors in retail environments. You need to process the events to produce a running average of shopper counts during the previous 15 minutes, calculated at five-minute intervals. Which type of window should you use?

- [ ] snapshot.
- [ ] tumbling.
- [x] hopping.
- [ ] sliding.

### You need to design a solution that will process streaming data from an Azure Event Hub and output the data to Azure Data Lake Storage. The solution must ensure that analysts can interactively query the streaming data. What should you use?

- [ ] event triggers in Azure Data Factory.
- [ ] Azure Stream Analytics and Azure Synapse notebooks.
- [x] Structured Streaming in Azure Databricks.
- [ ] Azure Queue storage and read-access geo-redundant storage (RA-GRS).

### You have an activity in an Azure Data Factory pipeline. The activity calls a stored procedure in a data warehouse in Azure Synapse Analytics and runs daily. You need to verify the duration of the activity when it ran last. What should you use?

- [x] activity runs in Azure Monitor.
- [ ] Activity log in Azure Synapse Analytics.
- [ ] the sys.dm_pdw_wait_stats data management view in Azure Synapse Analytics.
- [ ] an Azure Resource Manager template.

### You need to ensure that ServicePrincipal1 can perform the following actions: Traverse child items that are created in Folder2. Read files that are created in Folder2. The solution must use the principle of least privilege. Which two permissions should you grant to ServicePrincipal1 for Folder2?

![Question 174](images/question174.jpg)

- [ ] Access – Read.
- [ ] Access – Write.
- [x] Access – Execute.
- [x] Default-Read.
- [ ] Default – Write.
- [ ] Default – Execute.

### You are building an Azure Data Factory solution to process data received from Azure Event Hubs, and then ingested into an Azure Data Lake Storage Gen2 container. The data will be ingested every five minutes from devices into JSON files. The files have the following naming pattern. /{deviceType}/in/{YYYY}/{MM}/{DD}/{HH}/{deviceID}_{YYYY}{MM}{DD}HH}{mm}.json You need to prepare the data for batch data processing so that there is one dataset per hour per device Type. The solution must minimize read times. How should you configure the sink for the copy activity?

![Question 175](images/question175.jpg)

- [ ] Parameter: `@pipeline(),TriggerTime`. Naming pattern: `/{deviceID}/out/{YYYY}/{MM}/{DD}/{HH}.json`. Copy behavior: Add dynamic content.
- [ ] Parameter: `@pipeline(),TriggerType`. Naming pattern: `/{YYYY}/{MM}/{DD}/{deviceType}.json`. Copy behavior: Merge files.
- [x] Parameter: `@trigger().startTime`. Naming pattern: `/{YYYY}/{MM}/{DD}/{HH}_{deviceType}.json`. Copy behavior: Flatten hierarchy.
- [ ] Parameter: `@trigger().outputs.windowStartTime`. Naming pattern: `/{YYYY}/{MM}/{DD}/{HH}.json`. Copy behavior: Add dynamic content.

### You have an Azure Synapse Analytics dedicated SQL pool that contains a large fact table. The table contains 50 columns and 5 billion rows and is a heap. Most queries against the table aggregate values from approximately 100 million rows and return only two columns. You discover that the queries against the fact table are very slow. Which type of index should you add to provide the fastest query times?

- [ ] nonclustered columnstore.
- [x] clustered columnstore.
- [ ] nonclustered.
- [ ] clustered.

### You manage an enterprise data warehouse in Azure Synapse Analytics. Users report slow performance when they run commonly used queries. Users do not report performance changes for infrequently used queries. You need to monitor resource utilization to determine the source of the performance issues. Which metric should you monitor?

- [ ] DWU percentage.
- [x] Cache hit percentage Most Voted.
- [ ] Data Warehouse Units (DWU) used.
- [ ] Data IO percentage.

### You are designing an Azure Synapse solution that will provide a query interface for the data stored in an Azure Storage account. The storage account is only accessible from a virtual network. You need to recommend an authentication mechanism to ensure that the solution can access the source data. What should you recommend?

- [x] a managed identity.
- [ ] anonymous public read access.
- [ ] a shared key.

### You have an Azure Data Factory pipeline that is triggered hourly. The pipeline has had 100% success for the past seven days. The pipeline execution fails, and two retries that occur 15 minutes apart also fail. The third failure returns the following error. What is a possible cause of the error?

- [ ] The parameter used to generate year=2021/month=01/day=10/hour=06 was incorrect.
- [x] From 06:00 to 07:00 on January 10, 2021, there was no data in wwi/BIKES/CARBON.
- [ ] From 06:00 to 07:00 on January 10, 2021, the file format of data in wwi/BIKES/CARBON was incorrect.
- [ ] The pipeline was triggered too early.

### You have an Azure subscription that contains an Azure Synapse Analytics dedicated SQL pool named Pool1 and an Azure Data Lake Storage account named storage1. Storage1 requires secure transfers. You need to create an external data source in Pool1 that will be used to read .orc files in storage1. How should you complete the code?

![Question 180](images/question180.jpg)

- [ ] Box 1: `abfss`. Box 2: `RDBMS`.
- [ ] Box 1: `wasb`. Box 2: `BLOB_STORAGE`.
- [ ] Box 1: `wasbs`. Box 2: `SHARP MAP MANAGER`.
- [x] Box 1: `abfs`. Box 2: `HADOOP`.

### You have an Azure subscription that contains an Azure Synapse Analytics dedicated SQL pool named SQLPool1. SQLPool1 is currently paused. You need to restore the current state of SQLPool1 to a new SQL pool. What should you do first?

- [ ] Create a workspace.
- [ ] Create a user-defined restore point.
- [x] Resume SQLPool1.
- [ ] Create a new SQL pool.

### You have an Azure subscription that contains an Azure Blob Storage account named storage1 and an Azure Synapse Analytics dedicated SQL pool named Pool1. You need to store data in storage1. The data will be read by Pool1. The solution must meet the following requirements: Enable Pool1 to skip columns and rows that are unnecessary in a query. Automatically create column statistics. Minimize the size of files. Which type of file should you use?

- [ ] JSON.
- [x] Parquet.
- [ ] Avro.
- [ ] CSV.

### You are designing an enterprise data warehouse in Azure Synapse Analytics that will store website traffic analytics in a star schema. You plan to have a fact table for website visits. The table will be approximately 5 GB. You need to recommend which distribution type and index type to use for the table. The solution must provide the fastest query performance. What should you recommend?

![Question 183](images/question183.jpg)

- [ ] Distribution: Round robin. Index: Clustered columnstore.
- [ ] Distribution: Replicated. Index: Nonclustered.
- [x] Distribution: Hash. Index: Clustered columnstore.
- [ ] Distribution: Hash. Index: Clustered.

### You have an Azure Data Lake Storage Gen2 account named account1 that stores logs as shown in the following table. You do not expect that the logs will be accessed during the retention periods. You need to recommend a solution for account1 that meets the following requirements: Automatically deletes the logs at the end of each retention period Minimizes storage costs What should you include in the recommendation?

![Question 184](images/question184.jpg)

- [ ] To minimize storage costs: Store the infrastructure logs in the Cool access tier and the application logs in the Archive access tier. To delete logs automatically: Azure Data Factory pipelines.
- [ ] To minimize storage costs: Store the infrastructure logs and the application logs in the Cool access tier. To delete logs automatically: Azure Blob storage lifecycle management rules.
- [ ] To minimize storage costs: Store the infrastructure logs in the Cool access tier and the application logs in the Archive access tier. To delete logs automatically: Immutable Azure Blob storage time-based retention policies.
- [x] To minimize storage costs: Store the infrastructure logs in the Cool access tier and the application logs in the Archive access tier. To delete logs automatically: Azure Blob storage lifecycle management rules.

### You plan to perform batch processing in Azure Databricks once daily. Which type of Databricks cluster should you use?

- [ ] High Concurrency.
- [x] automated.
- [ ] interactive.

### You have an Azure subscription. You plan to build a data warehouse in an Azure Synapse Analytics dedicated SQL pool named pool1 that will contain staging tables and a dimensional model Pool1 will contain the following tables.

![Question 186](images/question186.jpg)

- [ ] Box 1: Replicated. Box 2: Round-robin. Box 3: Hash.
- [x] Box 1: Replicated. Box 2: Hash. Box 3: Round-robin.
- [ ] Box 1: Replicated. Box 2: Replicated. Box 3: Hash.
- [ ] Box 1: Round-robin. Box 2: Hash. Box 3: Round-robin.

### You have an Azure subscription that contains an Azure Synapse Analytics workspace named workspace1. Workspace1 contains a dedicated SQL pool named SQL Pool and an Apache Spark pool named sparkpool. Sparkpool1 contains a DataFrame named pyspark.df. You need to write the contents of pyspark_df to a tabte in SQLPooM by using a PySpark notebook. How should you complete the code?

![Question 187](images/question187.jpg)

- [ ] Box 1: `%%local`. Box 2: `saveAsTable`.
- [ ] Box 1: `%%local`. Box 2: `jdbc`.
- [ ] Box 1: `%%sql`. Box 2: `synapsesql`.
- [x] Box 1: `%%spark`. Box 2: `synapsesql`.

### You have an Azure subscription that contains an Azure Databricks workspace named databricks1 and an Azure Synapse Analytics workspace named synapse1. The synapse1 workspace contains an Apache Spark pool named pool1. You need to share an Apache Hive catalog of pool1 with databricks1. What should you do?

![Question 188](images/question188.jpg)

- [x] From synapse1, create a linked service to: Azure Cosmos DB. Configure pool1 to use the linked service as: A Hive metastore.
- [ ] From synapse1, create a linked service to: Azure SQL Database. Configure pool1 to use the linked service as: A Hive metastore.
- [ ] From synapse1, create a linked service to: Azure Data Lake Storage Gen2. Configure pool1 to use the linked service as: An Azure Purview account.
- [ ] From synapse1, create a linked service to: Azure SQL Database. Configure pool1 to use the linked service as: A managed Hive metastore service.

### You are designing a dimension table in an Azure Synapse Analytics dedicated SQL pool. You need to create a surrogate key for the table. The solution must provide the fastest query performance. What should you use for the surrogate key?

- [ ] a GUID column
- [ ] a sequence object
- [x] an IDENTITY column

### You have an Azure subscription that contains an Azure Data Lake Storage account named myaccount1. The myaccount1 account contains two containers named container1 and contained. The subscription is linked to an Azure Active Directory (Azure AD) tenant that contains a security group named Group1. You need to grant Group1 read access to contamer1. The solution must use the principle of least privilege. Which role should you assign to Group1?

- [x] Storage Blob Data Reader for container1
- [ ] Storage Table Data Reader for container1
- [ ] Storage Blob Data Reader for myaccount1
- [ ] Storage Table Data Reader for myaccount1

### You are implementing a batch dataset in the Parquet format. Data tiles will be produced by using Azure Data Factory and stored in Azure Data Lake Storage Gen2. The files will be consumed by an Azure Synapse Analytics serverless SQL pool. You need to minimize storage costs for the solution. What should you do?

- [ ] Store all the data as strings in the Parquet tiles.
- [ ] Use OPENROWEST to query the Parquet files.
- [ ] Create an external table mat contains a subset of columns from the Parquet files.
- [x] Use Snappy compression for the files.

### You have an Azure Data Factory pipeline that contains a data flow. The data flow contains the following expression: `iif(isNull(columnName), 'defaultValue', columnName)`. You need to ensure that null values in the specified column are replaced with a default value.

![Question 192](images/question192.jpg)

- [ ] Number of columns: 4. Number of rows: 3.
- [ ] Number of columns: 10. Number of rows: 22.
- [x] Number of columns: 22. Number of rows: 4.
- [ ] Number of columns: 10. Number of rows: 3.

### You have an Azure Synapse Analytics pipeline named Pipeline1 that contains a data flow activity named Dataflow1. Pipeline1 retrieves files from an Azure Data Lake Storage Gen 2 account named storage1. Dataflow1 uses the AutoResolveIntegrationRuntime integration runtime configured with a core count of 128. You need to optimize the number of cores used by Dataflow1 to accommodate the size of the files in storage1. What should you configure?

![Question 193](images/question193.jpg)

- [x] To Pipeline1, add: A Get Metadata activity. For Dataflow1, set the core count by using: Dynamic content.
- [ ] To Pipeline1, add: A Get Metadata activity. For Dataflow1, set the core count by using: User properties.
- [ ] To Pipeline1, add: An if Condition activity. For Dataflow1, set the core count by using: Parameters.
- [ ] To Pipeline1, add: A custom activity. For Dataflow1, set the core count by using: User properties.

### You have an enterprise data warehouse in Azure Synapse Analytics. Using PolyBase, you create an external table named [Ext].[Items] to query Parquet files stored in Azure Data Lake Storage Gen2 without importing the data to the data warehouse. The external table has three columns. You discover that the Parquet files have a fourth column named ItemID. Which command should you run to add the ItemID column to the external table?

![Question 194](images/question194.jpg)

- [ ] Option A.
- [ ] Option B.
- [x] Option C.
- [ ] Option D.

### You are designing a star schema for a dataset that contains records of online orders. Each record includes an order date, an order due date, and an order ship date. You need to ensure that the design provides the fastest query times of the records when querying for arbitrary date ranges and aggregating by fiscal calendar attributes. Which two actions should you perform?

- [ ] Create a date dimension table that has a `DateTime` key.
- [ ] Use built-in SQL functions to extract date attributes.
- [x] Create a date dimension table that has an integer key in the format of yyyymmdd.
- [x] In the fact table, use integer columns for the date fields.
- [ ] Use `DateTime` columns for the date fields.

### You have an Azure Databricks workspace named workspace1 in the Standard pricing tier. You need to configure workspace1 to support autoscaling all-purpose clusters. The solution must meet the following requirements: Automatically scale down workers when the cluster is underutilized for three minutes. Minimize the time it takes to scale to the maximum number of workers. Minimize costs. What should you do first?

- [ ] Enable container services for workspace1.
- [x] Upgrade workspace1 to the Premium pricing tier.
- [ ] Set Cluster Mode to High Concurrency.
- [ ] Create a cluster policy in workspace1.

### You have an Azure data factory. You need to examine the pipeline failures from the last 180 flays. What should you use?

- [ ] the Activity tog blade for the Data Factory resource.
- [x] Azure Data Factory activity runs in Azure Monitor.
- [ ] Pipeline runs in the Azure Data Factory user experience.
- [ ] the Resource health blade for the Data Factory resource.

### You have an Azure Stream Analytics query. The query returns a result set that contains 10,000 distinct values for a column named clusterID. You monitor the Stream Analytics job and discover high latency. You need to reduce the latency. Which two actions should you perform? Each correct answer presents a complete solution.

- [ ] Add a pass-through query.
- [ ] Add a temporal analytic function.
- [x] Scale out the query by using PARTITION BY.
- [ ] Convert the query to a reference query.
- [x] Increase the number of streaming units.

### You have an Azure Synapse Analytics Apache Spark pool named Pool1. You plan to load JSON files from an Azure Data Lake Storage Gen2 container into the tables in Pool1. The structure and data types vary by file. You need to load the files into the tables. The solution must maintain the source data types. What should you do?

- [ ] Use a Get Metadata activity in Azure Data Factory.
- [ ] Use a Conditional Split transformation in an Azure Synapse data flow.
- [ ] Load the data by using the OPEHROwset Transact-SQL command in an Azure Synapse Anarytics serverless SQL pool.
- [x] Load the data by using PySpark.

### You are performing exploratory analysis of the bus fare data in an Azure Data Lake Storage Gen2 account by using an Azure Synapse Analytics serverless SQL pool. You execute the Transact-SQL query shown in the following exhibit. What do the query results include?

![Question 200](images/question200.jpg)

- [ ] Only CSV files in the tripdata_2020 subfolder.
- [ ] All files that have file names that beginning with "tripdata_2020".
- [ ] All CSV files that have file names that contain "tripdata_2020".
- [x] Only CSV that have file names that beginning with "tripdata_2020".

### You have two Azure SQL databases named DB1 and DB2. DB1 contains a table named Table 1. Table1 contains a timestamp column named LastModifiedOn. LastModifiedOn contains the timestamp of the most recent update for each individual row. DB2 contains a table named Watermark. Watermark contains a single timestamp column named WatermarkValue. You plan to create an Azure Data Factory pipeline that will incrementally upload into Azure Blob Storage all the rows in Table1 for which the LastModifiedOn column contains a timestamp newer than the most recent value of the WatermarkValue column in Watermark. You need to identify which activities to include in the pipeline. The solution must meet the following requirements: Minimize the effort to author the pipeline. Ensure that the number of data integration units allocated to the upload operation can be controlled. What should you identify?

![Question 201](images/question201.jpg)

- [ ] To retrieve the watermark value, use: Filter. To perform the upload, use: Custom.
- [ ] To retrieve the watermark value, use: Get Metadata. To perform the upload, use: Custom.
- [x] To retrieve the watermark value, use: Lookup. To perform the upload, use: Copy data.
- [ ] To retrieve the watermark value, use: Lookup. To perform the upload, use: Data flow.

### You have a Microsoft Purview account. The Lineage view of a CSV file is shown in the following exhibit. How is the data for the lineage populated?

![Question 202](images/question202.jpg)

- [ ] manually.
- [ ] by scanning data stores.
- [x] by executing a Data Factory pipeline.

### You need to create a partitioned table in an Azure Synapse Analytics dedicated SQL pool. How should you complete the Transact-SQL statement?

![Question 203](images/question203.jpg)

- [x] Box 1: `DISTRIBUTION`. Box 2: `PARTITION`.
- [ ] Box 1: `PARTITION FUNCTION`. Box 2: `DISTRIBUTION`.
- [ ] Box 1: `CLUSTERED INDEX`. Box 2: `PARTITION SCHEME`.
- [ ] Box 1: `COLLATE`. Box 2: `PARTITION FUNCTION`.

### You configure version control for an Azure Data Factory instance as shown in the following exhibit.

![Question 204](images/question204.jpg)

- [ ] Azure Resource Manager (ARM) templates for the pipeline assets are stored in: `adf_publish`. A Data Factory Azure Resorce Manager (ARM) template named [contososales] can be found in: `/`.
- [ ] Azure Resource Manager (ARM) templates for the pipeline assets are stored in: `/`. A Data Factory Azure Resorce Manager (ARM) template named [contososales] can be found in: `/dwh_batchetl/adf_publish/contososales`.
- [ ] Azure Resource Manager (ARM) templates for the pipeline assets are stored in: `main`. A Data Factory Azure Resorce Manager (ARM) template named [contososales] can be found in: `/contososales`.
- [x] Azure Resource Manager (ARM) templates for the pipeline assets are stored in: `adf_publish`. A Data Factory Azure Resorce Manager (ARM) template named [contososales] can be found in: `/dwh_batchetl/adf_publish/contososales`.

### You have an Azure Data Factory pipeline that has the activities shown in the following exhibit.

![Question 205 part 1](images/question205_1.png)
![Question 205 part 2](images/question205_2.jpg)

- [x] Stored procedure1 will execute `Web1` and `Set variable1`: `succeed`. If `Web1` and `Set variable2` succeds, the pipeline status will be: `Failed`.
- [ ] Stored procedure1 will execute `Web1` and `Set variable1`: `complete`. If `Web1` and `Set variable2` succeds, the pipeline status will be: `Failed`.
- [ ] Stored procedure1 will execute `Web1` and `Set variable1`: `fail`. If `Web1` and `Set variable2` succeds, the pipeline status will be: `Succeeded`.
- [ ] Stored procedure1 will execute `Web1` and `Set variable1`: `complete`. If `Web1` and `Set variable2` succeds, the pipeline status will be: `Canceled`.

### You have an Azure subscription that is linked to a hybrid Azure Active Directory (Azure AD) tenant. The subscription contains an Azure Synapse Analytics SQL pool named Pool1. You need to recommend an authentication solution for Pool1. The solution must support multi-factor authentication (MFA) and database-level authentication. Which authentication solution or solutions should you include in the recommendation?

![Question 206](images/question206.jpg)

- [ ] MFA: Microsoft SQL Server authentication. Database-level authentication: Application roles.
- [ ] MFA: Passwordless authentication. Database-level authentication: Contained database users.
- [ ] MFA: Windows authentication. Database-level authentication: Microsoft SQL Server logins.
- [x] MFA: Azure AD authentication. Database-level authentication: Contained database users.

### You have an Azure Data Factory that contains 10 pipelines. You need to label each pipeline with its main purpose of either ingest, transform, or load. The labels must be available for grouping and filtering when using the monitoring experience in Data Factory. What should you add to each pipeline?

- [ ] a resource tag
- [ ] a correlation ID
- [ ] a run group ID
- [x] an annotation

### You are planning a solution to aggregate streaming data that originates in Apache Kafka and is output to Azure Data Lake Storage Gen2. The developers who will implement the stream processing solution use Java, Which service should you recommend using to process the streaming data?

- [ ] Azure Data Factory.
- [ ] Azure Stream Analytics.
- [x] Azure Databricks.
- [ ] Azure Event Hubs.

### You have an Azure Blob storage account that contains a folder. The folder contains 120,000 files. Each file contains 62 columns. Each day, 1,500 new files are added to the folder. You plan to incrementally load five data columns from each new file into an Azure Synapse Analytics workspace. You need to minimize how long it takes to perform the incremental loads. What should you use to store the files and format?

![Question 209](images/question209.jpg)

- [ ] Storage: Multiple blob storage accounts. Format: CSV.
- [ ] Storage: Timeslice partitioning in the folders. Format: JSON.
- [x] Storage:Timeslice partitioning in the folders. Format: CSV.
- [ ] Storage: Timeslice partitioning in the folders. Format: Apache Parquet.

### You are designing 2 solution that will use tables in Delta Lake on Azure Databricks. You need to minimize how long it takes to perform the following: Queries against non-partitioned tables. Joins on non-partitioned columns. Which two options should you include in the solution?

- [x] Z-Ordering
- [ ] Apache Spark caching
- [x] dynamic file pruning (DFP)
- [ ] the clone command

### You have an Azure Synapse Analytics dedicated SQL pool. You need to create a table named FactInternetSales that will be a large fact table in a dimensional model. FactInternetSales will contain 100 million rows and two columns named SalesAmount and OrderQuantity. Queries executed on FactInternetSales will aggregate the values in SalesAmount and OrderQuantity from the last year for a specific product. The solution must minimize the data size and query execution time. How should you complete the code?

![Question 211](images/question211.jpg)

- [ ] Box 1: `( CLUSTERED COLUMNSTORE INDEX`. Box 2: `Hash([OrderDataKey])`.
- [ ] Box 1: `( HEAP`. Box 2: `REPLICATE`.
- [x] Box 1: `( CLUSTERED COLUMNSTORE INDEX`. Box 2: `Hash([ProductKey])`.
- [ ] Box 1: `( INDEX on [ProductKey]`. Box 2: `ROUND_ROBIN`.

### You have an Azure Synapse Analytics dedicated SQL pool. You need to Create a fact table named Table1 that will store sales data from the last three years. The solution must be optimized for the following query operations: Show order counts by week. Calculate sales totals by region. Calculate sales totals by product. Find all the orders from a given month. Which data should you use to partition Table1?

- [ ] Region.
- [ ] Product.
- [ ] Week.
- [x] Month.

### You use Azure Data Lake Storage Gen2 to store data that data scientists and data engineers will query by using Azure Databricks interactive notebooks. Users will have access only to the Data Lake Storage folders that relate to the projects on which they work. You need to recommend which authentication methods to use for Databricks and Data Lake Storage to provide the users with the appropriate access. The solution must minimize administrative effort and development effort. Which authentication method should you recommend for each Azure service?

![Question 213](images/question213.jpg)

- [ ] Databricks: Azure Key Vault secrets. Data Lake Storage: Azure Active Directory credential passthrough.
- [x] Databricks: Personal access tokens. Data Lake Storage: Azure Active Directory credential passthrough.
- [ ] Databricks: Personal access tokens. Data Lake Storage: Shared access keys.
- [ ] Databricks: Personal access tokens. Data Lake Storage: Shared access signatures.

### You have an Azure Synapse Analytics dedicated SQL pod. You need to create a pipeline that will execute a stored procedure in the dedicated SQL pool and use the returned result set as the input or a downstream activity. The solution must minimize development effort. Which Type of activity should you use in the pipeline?

- [ ] Notebook.
- [ ] U-SQ.
- [x] Script.
- [ ] Stored Procedure.

### Solution: You use an Azure Data Factory schedule trigger to execute a pipeline that executes an Azure Databricks notebook, and then inserts the data into the data warehouse. Dow this meet the goal?

- [x] Yes.
- [ ] No.

### You have a SQL pool in Azure Synapse. You discover that some queries fail or take a long time to complete. You need to monitor for transactions that have rolled back. Which dynamic management view should you query?

- [ ] `sys.dm_pdw_request_steps`.
- [x] `sys dm_pdw_nodes_tran_database_transactions`.
- [ ] `sys.dm_pdw_waits`.
- [ ] `sys.dm_pdw_exec_sessions`.

### You have an Azure Data Factory pipeline named pipeline1 that is invoked by a tumbling window trigger named Trigger1. Trigger1 has a recurrence of 60 minutes. You need to ensure that pipeline1 will execute only if the previous execution completes successfully. How should you configure the self-dependency for Trigger1?

- [ ] `offset: "-00:01:00" size: "00:01:00"`.
- [ ] `offset: "01:00:00" size: "-01:00:00"`.
- [ ] `offset: "01:00:00" size: "01:00:00"`.
- [x] `offset: "-01:00:00" size: "01:00:00"`.

### You have an Azure Synapse Analytics serverless SQL pool, an Azure Synapse Analytics dedicated SQL pool, an Apache Spark pool, and an Azure Data Lake Storage Gen2 account. You need to create a table in a lake database. The table must be available to both the serverless SQL pool and the Spark pool. Where should you create the table, and Which file format should you use for data in the table?

![Question 218](images/question218.jpg)

- [ ] Create the table in: The dedicated SQL pool. File format: Delta.
- [ ] Create the table in: The serverless SQL pool. File format: JSON.
- [x] Create the table in: The dedicated SQL pool. File format: Apache Parquet.
- [ ] Create the table in: The Spark pool. File format: JSON.

### You are designing an inventory updates table in an Azure Synapse Analytics dedicated SQL pool. The table will have a clustered columnstore index and will include the following columns: You identify the following usage patterns: Analysts will most commonly analyze transactions for a warehouse. Queries will summarize by product category type, date, and/or inventory event type. You need to recommend a partition strategy for the table to minimize query times. On which column should you partition the table?

- [ ] ProductCategoryTypeIDEventDate.
- [ ] EventDate.
- [x] WarehouseID.
- [ ] EventTypeID.

### You have two fact tables named Flight and Weather. Queries targeting the tables will be based on the join between the following columns. You need to recommend a solution that maximizes query performance. What should you include in the recommendation?

![Question 220](images/question220.jpg)

- [ ] In the tables use a hash distribution of ArrivalDateTime and ReportDateTime.
- [x] In the tables use a hash distribution of ArrivaIAirportID and AirportlD.
- [ ] In each table, create an identity column.
- [ ] In each table, create a column as a composite of the other two columns in the table.

### You have an Azure Synapse Analytics dedicated SQL pool that contains a table named Table1. Table1 contains the following: One billion rows A clustered columnstore index A hash-distributed column named Product Key A column named Sales Date that is of the date data type and cannot be null Thirty million rows will be added to Table1 each month. You need to partition Table1 based on the Sales Date column. The solution must optimize query performance and data loading. How often should you create a partition?

- [x] once per month.
- [ ] once per year.
- [ ] once per day.
- [ ] once per week.

### You are designing a folder structure for the files m an Azure Data Lake Storage Gen2 account. The account has one container that contains three years of data. You need to recommend a folder structure that meets the following requirements: Supports partition elimination for queries by Azure Synapse Analytics serverless SQL pooh Supports fast data retrieval for data from the current month Simplifies data security management by department Which folder structure should you recommend?

- [ ] YYYMMDDDepartmentDataSourceDataFile_YYYMMMDD.parquet
- [ ] DepdftmentDataSourceYYYMMDataFile_YYYYMMDD.parquet
- [ ] DDMMYYYYDepartmentDataSourceDataFile_DDMMYY.parquet
- [x] DataSourceDepartmentYYYYMMDataFile_YYYYMMDD.parquet

### You have an Azure Databricks workspace that contains a Delta Lake dimension table named Tablet. Table1 is a Type 2 slowly changing dimension (SCD) table. You need to apply updates from a source table to Table1. Which Apache Spark SQL operation should you use?

- [ ] `CREATE`.
- [ ] `UPDATE`.
- [x] `MERGE`.
- [ ] `ALTER`.

### You store files in an Azure Data Lake Storage Gen2 container. The container has the storage policy shown in the following exhibit. Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.

![Question 224](images/question224.jpg)

- [x] The files are [...] after 30 days: moved to cool storage. The storage policy applies to: `container1/contoso.csv`.
- [ ] The files are [...] after 30 days: moved to archive storage. The storage policy applies to: `container1/docs/contoso.json`.
- [ ] The files are [...] after 30 days: moved to hot storage. The storage policy applies to: `container1/docs/contoso.json`.
- [ ] The files are [...] after 30 days: deleted from the container. The storage policy applies to: `container1/mycontoso/contoso.csv`.

### You have an Azure Synapse Analytics dedicated SQL pool named Pool1 that contains an external table named Sales. Sales contains sales data. Each row in Sales contains data on a single sale, including the name of the salesperson. You need to implement row-level security (RLS). The solution must ensure that the salespeople can access only their respective sales. What should you do?

![Question 225](images/question225.jpg)

- [ ] Create: A materialized view in Pool1. Restrict row access by using: The `CONTAINS` predicate.
- [ ] Create: Database scoped credentials in Pool1. Restrict row access by using: A table-valued function.
- [ ] Create: A security policy for Sales. Restrict row access by using: A masking rule.
- [x] Create: A security policy for Sales. Restrict row access by using: A table-valued function.

### You are building a data flow in Azure Data Factory that upserts data into a table in an Azure Synapse Analytics dedicated SQL pool. You need to add a transformation to the data flow. The transformation must specify logic indicating when a row from the input data must be upserted into the sink. Which type of transformation should you add to the data flow?

- [ ] join.
- [ ] select.
- [ ] surrogate key.
- [x] alter row.

### You are designing an Azure Data Lake Storage solution that will transform raw JSON files for use in an analytical workload. You need to recommend a format for the transformed files. The solution must meet the following requirements: Contain information about the data types of each column in the files. Support querying a subset of columns in the files. Support read-heavy analytical workloads. Minimize the file size. What should you recommend?

- [ ] JSON.
- [ ] CSV.
- [ ] Apache Avro.
- [x] Apache Parquet.

### You have two Azure Blob Storage accounts named account1 and account2? You plan to create an Azure Data Factory pipeline that will use scheduled intervals to replicate newly created or modified blobs from account1 to account? You need to recommend a solution to implement the pipeline. The solution must meet the following requirements: Ensure that the pipeline only copies blobs that were created of modified since the most recent replication event. Minimize the effort to create the pipeline. What should you recommend?

- [ ] Create a pipeline that contains a flowlet.
- [ ] Create a pipeline that contains a Data Flow activity.
- [ ] Run the Copy Data tool and select Metadata-driven copy task.
- [x] Run the Copy Data tool and select Built-in copy task.

### You are developing a solution that will stream to Azure Stream Analytics. The solution will have both streaming data and reference data. Which input type should you use for the reference data?

- [ ] Azure Cosmos DB.
- [x] Azure Blob storage.
- [ ] Azure IoT Hub.
- [ ] Azure Event Hubs.

### You have an Azure Data Lake Storage account that has a virtual network service endpoint configured. You plan to use Azure Data Factory to extract data from the Data Lake Storage account. The data will then be loaded to a data warehouse in Azure Synapse Analytics by using PolyBase. Which authentication method should you use to access Data Lake Storage?

- [ ] shared access key authentication.
- [x] managed identity authentication.
- [ ] account key authentication.
- [ ] service principal authentication.

### Solution: You modify the files to ensure that each row is more than 1 MB. Does this meet the goal?

- [x] Yes.
- [ ] No.

### You have an Azure Data Lake Storage Gen2 container that contains 100 TB of data. You need to ensure that the data in the container is available for read workloads in a secondary region if an outage occurs in the primary region. The solution must minimize costs. Which type of data redundancy should you use?

- [ ] Zone-redundant storage (ZRS).
- [ ] Read-access geo-redundant storage (RA-GRS).
- [ ] Locally-redundant storage (LRS).
- [x] Geo-redundant storage (GRS).

### You have several Azure Data Factory pipelines that contain a mix of the following types of activities. Wrangling data flow. Notebook. Copy jar. Which two Azure services should you use to debug the activities?

- [ ] Azure HDInsight.
- [x] Azure Databricks.
- [ ] Azure Machine Learning.
- [x] Azure Data Factory.
- [ ] Azure Synapse Analytics.

### You plan to implement an Azure Data Lake Gen 2 storage account. You need to ensure that the data lake will remain available if a data center fails in the primary Azure region. The solution must minimize costs. Which type of replication should you use for the storage account?

- [x] geo-redundant storage (GRS).
- [ ] geo-zone-redundant storage (GZRS).
- [ ] locally-redundant storage (LRS).
- [ ] zone-redundant storage (ZRS).

### You are designing a fact table named FactPurchase in an Azure Synapse Analytics dedicated SQL pool. The table contains purchases from suppliers for a retail store. FactPurchase will contain the following columns.FactPurchase will have 1 million rows of data added daily and will contain three years of data. Transact-SQL queries similar to the following query will be executed daily.SELECT - SupplierKey, StockItemKey, IsOrderFinalized, COUNT(*)FROM FactPurchase - WHERE DateKey >= 20210101 - AND DateKey <= 20210131 - GROUP By SupplierKey, StockItemKey, IsOrderFinalized Which table distribution will minimize query times?

![Question 235](images/question235.jpg)

- [ ] replicated.
- [x] hash-distributed on PurchaseKey.
- [ ] round-robin.
- [ ] hash-distributed on IsOrderFinalized.

### You are designing a financial transactions table in an Azure Synapse Analytics dedicated SQL pool. The table will have a clustered columnstore index and will include the following columns: TransactionType: 40 million rows per transaction type CustomerSegment: 4 million per customer segment TransactionMonth: 65 million rows per month AccountType: 500 million per account type You have the following query requirements: Analysts will most commonly analyze transactions for a given month. Transactions analysis will typically summarize transactions by transaction type, customer segment, and/or account type You need to recommend a partition strategy for the table to minimize query times. On which column should you recommend partitioning the table?

- [ ] CustomerSegment.
- [ ] AccountType.
- [ ] TransactionType.
- [x] TransactionMonth.

### You need to build a solution to ensure that users can query specific files in an Azure Data Lake Storage Gen2 account from an Azure Synapse Analytics serverless SQL pool. Which three actions should you perform in sequence?

![Question 237](images/question237.jpg)

- [ ] Box 1: Create an external file format object. Box 2: Create an external data source. Box 3: Create a table.
- [ ] Box 1: Create an external table. Box 2: Create a query that uses `Create as Select`. Box 3: Create an external data source.
- [x] Box 1: Create an external data source. Box 2: Create an external file format object. Box 3: Create an external table.
- [ ] Box 1: Create an external table. Box 2: Create a table. Box 3: Create a query that uses Create Table as Select.

### You are designing a data mart for the human resources (HR) department at your company. The data mart will contain employee information and employee transactions. From a source system, you have a flat extract that has the following fields: EmployeeIDFirstName - LastName Recipient GrossAmount TransactionID GovernmentID NetAmountPaid TransactionDate You need to design a star schema data model in an Azure Synapse Analytics dedicated SQL pool for the data mart. Which two tables should you create?

- [ ] Dimension table for Transaction.
- [ ] Dimension table for EmployeeTransaction.
- [x] Dimension table for Employee.
- [ ] Fact table for Employee.
- [x] Fact table for Transaction.

### You have an Azure Synapse Analytics dedicated SQL pool named Pool1 and an Azure Data Lake Storage Gen2 account named Account1. You plan to access the files in Account1 by using an external table. You need to create a data source in Pool1 that you can reference when you create the external table.How should you complete the Transact-SQL statement?

![Question 239](images/question239.jpg)

- [ ] Box 1: `TYPE = BLOB_STORAGE`. Box 2: `blob`.
- [ ] Box 1: `PUSHDOWN = ON`. Box 2: `dfs`.
- [ ] Box 1: `TYPE = BLOB_STORAGE`. Box 2: `table`.
- [x] Box 1: `dfs`. Box 2: `TYPE = HADOOP`.

### You have an Azure Synapse Analytics dedicated SQL pool named Pool1. Pool1 contains a table named table1. You load 5 TB of data into table1. You need to ensure that columnstore compression is maximized for table1. Which statement should you execute?

- [ ] DBCC INDEXDEFRAG (pool1, table1).
- [ ] DBCC DBREINDEX (table1).
- [ ] ALTER INDEX ALL on table1 REORGANIZE.
- [x] ALTER INDEX ALL on table1 REBUILD.

### You have an Azure Synapse Analytics dedicated SQL pool named pool1. You plan to implement a star schema in pool and create a new table named DimCustomer by using the following code. You need to ensure that DimCustomer has the necessary columns to support a Type 2 slowly changing dimension (SCD). Which two columns should you add? Each correct answer presents part of the solution.

![Question 241](images/question241.jpg)

- [ ] [HistoricalSalesPerson] [nvarchar] (256) NOT NULL
- [x] [EffectiveEndDate] [datetime] NOT NULL
- [ ] [PreviousModifiedDate] [datetime] NOT NULL
- [ ] [RowID] [bigint] NOT NULL
- [x] [EffectiveStartDate] [datetime] NOT NULL

### You have an Azure subscription that contains an Azure Data Lake Storage Gen2 account named account1 and an Azure Synapse Analytics workspace named workspace1. You need to create an external table in a serverless SQL pool in workspace1. The external table will reference CSV files stored in account1. The solution must maximize performance. How should you configure the external table?

- [x] Use a native external table and authenticate by using a Shared Access Signature (SAS).
- [ ] Use a native external table and authenticate by using a storage account key.
- [ ] Use an Apache Hadoop external table and authenticate by using a Shared Access Signature (SAS).
- [ ] Use an Apache Hadoop external table and authenticate by using a service principal in Microsoft Azure Active Directory (Azure AD), part of Microsoft Entra.

### You have an Azure subscription that contains the resources shown in the following table. You need to read the TSV files by using ad-hoc queries and the OPENROWSET function. The solution must assign a name and override the inferred data type of each column. What should you include in the OPENROWSET function?

![Question 243](images/question243.jpg)

- [x] the WITH clause.
- [ ] the ROWSET_OPTIONS bulk option.
- [ ] the DATAFILETYPE bulk option.
- [ ] the DATA_SOURCE parameter.

### You have an Azure Synapse Analytics dedicated SQL pool that contains a table named DimSalesPerson. DimSalesPerson contains the following columns: RepSourceI SalesRepID FirstName LastName StartDate EndDate Region You are developing an Azure Synapse Analytics pipeline that includes a mapping data flow named Dataflow1. Dataflow1 will read sales team data from an external source and use a Type 2 slowly changing dimension (SCD) when loading the data into DimSalesPerson. You need to update the last name of a salesperson in DimSalesPerson. Which two actions should you perform? Each correct answer presents part of the solution.

- [ ] Update three columns of an existing row.
- [ ] Update two columns of an existing row.
- [x] Insert an extra row.
- [x] Update one column of an existing row.

### You plan to use an Azure Data Lake Storage Gen2 account to implement a Data Lake development environment that meets the following requirements: Read and write access to data must be maintained if an availability zone becomes unavailable. Data that was last modified more than two years ago must be deleted automatically. Costs must be minimized. What should you configure?

![Question 245](images/question245.jpg)

- [x] For storage redundancy: Zone-redundant storage (ZRS). For data deletion: A lifecycle management policy.
- [ ] For storage redundancy: Locally-redundant storage (LRS). For data deletion: A lifecycle management policy.
- [ ] For storage redundancy: Zone-redundant storage (ZRS). For data deletion: Soft delete.
- [ ] For storage redundancy: Geo-zone-redundant storage (GZRS). For data deletion: Versioning.

### You are developing an Azure Synapse Analytics pipeline that will include a mapping data flow named `Dataflow1`. `Dataflow1` will read customer data from an external source and use a Type 1 slowly changing dimension (SCD) when loading the data into a table named `DimCustomer` in an Azure Synapse Analytics dedicated SQL pool. You need to ensure that `Dataflow1` can perform the following tasks:Detect whether the data of a given customer has changed in the `DimCustomer` table. Perform an upsert to the `DimCustomer` table. Which type of transformation should you use for each task?

![Question 246](images/question246.jpg)

- [ ] Detect whether the data of a given customer has changed in the `DimCustomer` table: Aggregate. Perform an upsert to the `DimCustomer` table: Alter row.
- [ ] Detect whether the data of a given customer has changed in the `DimCustomer` table: Surrogate key. Perform an upsert to the `DimCustomer` table: Assert.
- [x] Detect whether the data of a given customer has changed in the `DimCustomer` table: Derrived column. Perform an upsert to the `DimCustomer` table: Alter row.
- [ ] Detect whether the data of a given customer has changed in the `DimCustomer` table: Surrogate key. Perform an upsert to the `DimCustomer` table: Cast.

### You have an Azure Synapse Analytics serverless SQL pool. You have an Azure Data Lake Storage account named adls1 that contains a public container named container1. The container1 container contains a folder named folder1. You need to query the top 100 rows of all the CSV files in folder1. How should you complete the query?

![Question 247](images/question247.jpg)

- [x] Box 1: `OPENROWSET`. Box 2: `BULK`.
- [ ] Box 1: `BULK`. Box 2: `DATA_SOURCE`.
- [ ] Box 1: `LOCATION`. Box 2: `OPERNROWSET`.
- [ ] Box 1: `LOCATION`. Box 2: `BULK`.

### You have an Azure Data Lake Storage Gen2 account named storage1. You plan to implement query acceleration for storage1. Which two file types support query acceleration? Each correct answer presents a complete solution.

- [x] JSON.
- [ ] Apache Parquet.
- [ ] XML.
- [x] CSV.
- [ ] Avro.

### You have a data warehouse. You need to implement a slowly changing dimension (SCD) named Product that will include three columns named `ProductName`, `ProductColor`, and `ProductSize`. The solution must meet the following requirements: Prevent changes to the values stored in `ProductNameRetain` only the current and the last values in `ProductSize`. Retain all the current and previous values in `ProductColor`. Which type of SCD should you implement for each column?

![Question 249](images/question249.jpg)

- [ ] `ProductName`: Type 1. `Color`: Type 2. `Size`: Type 3.
- [ ] `ProductName`: Type 0. `Color`: Type 2. `Size`: Type 3.
- [ ] `ProductName`: Type 0. `Color`: Type 1. `Size`: Type 2.
- [x] `ProductName`: Type 0. `Color`: Type 2. `Size`: Type 3.

### You are incrementally loading data into fact tables in an Azure Synapse Analytics dedicated SQL pool. Each batch of incoming data is staged before being loaded into the fact tables. You need to ensure that the incoming data is staged as quickly as possible. How should you configure the staging tables?

![Question 250](images/question250.jpg)

- [x] Table distribution: `ROUND_ROBIN`. Table structure: Heap.
- [ ] Table distribution: `HASH`. Table structure: Heap.
- [ ] Table distribution: `REPLICATE`. Table structure: Clustered index.
- [ ] Table distribution: `ROUND_ROBIN`. Table structure: Columnstore index.

### You are designing an Azure Stream Analytics solution that will analyze Twitter data. You need to count the tweets in each 10-second window. The solution must ensure that each tweet is counted only once. Solution: You use a hopping window that uses a hop size of 5 seconds and a window size 10 seconds. Does this meet the goal?

- [ ] Yes.
- [x] No.

### Which Azure service and feature should you recommend using to manage the transient data for Data Lake Storage?

![Question 252](images/question252.png)

- [x] Service: Azure Data Factory. Feature: Delete Activity.
- [ ] Service: Azure Storage. Feature: Lifecycle management rule.
- [ ] Service: Azure Synapse Analytics. Feature: `DROP EXTERNAL TABLE`.
- [ ] Service: Azure Data Factory. Feature: Lifecycle management rule.

### You have an Azure data factory named adf1 that contains a pipeline named ExecProduct. ExecProduct contains a data flow named Product. The Product data flow contains the following transformations: `WeeklyData`: A source that points to a CSV file in an Azure Data Lake Storage Gen2 account with 20 columns. `ProductColumns`: A select transformation that selects from `WeeklyData` six columns named `ProductID`, `ProductDescr`, `ProductSubCategory`, `ProductCategory`, `ProductStatus`, and `ProductLastUpdated`. `ProductRows`: An aggregate transformation. `ProductList`: A sink that outputs data to an Azure Synapse Analytics dedicated SQL pool. The Aggregate settings for ProductRows are configured as shown in the following exhibit. There will be six columns in the output of `ProductRows`.

- [ ] Yes.
- [x] No.

![Question 253](images/question253_254_255.png)

### You have an Azure data factory named adf1 that contains a pipeline named ExecProduct. ExecProduct contains a data flow named Product. The Product data flow contains the following transformations: `WeeklyData`: A source that points to a CSV file in an Azure Data Lake Storage Gen2 account with 20 columns. `ProductColumns`: A select transformation that selects from `WeeklyData` six columns named `ProductID`, `ProductDescr`, `ProductSubCategory`, `ProductCategory`, `ProductStatus`, and `ProductLastUpdated`. `ProductRows`: An aggregate transformation. `ProductList`: A sink that outputs data to an Azure Synapse Analytics dedicated SQL pool. The Aggregate settings for ProductRows are configured as shown in the following exhibit. There will always be one output row for each unique value of `ProductDescr`.

![Question 254](images/question253_254_255.png)

- [ ] Yes.
- [x] No.

### You have an Azure data factory named adf1 that contains a pipeline named ExecProduct. ExecProduct contains a data flow named Product. The Product data flow contains the following transformations: `WeeklyData`: A source that points to a CSV file in an Azure Data Lake Storage Gen2 account with 20 columns. `ProductColumns`: A select transformation that selects from `WeeklyData` six columns named `ProductID`, `ProductDescr`, `ProductSubCategory`, `ProductCategory`, `ProductStatus`, and `ProductLastUpdated`. `ProductRows`: An aggregate transformation. `ProductList`: A sink that outputs data to an Azure Synapse Analytics dedicated SQL pool. The Aggregate settings for ProductRows are configured as shown in the following exhibit. There will always be one output row for each unique value of `ProductID`.

![Question 255](images/question253_254_255.png)

- [x] Yes.
- [ ] No.
