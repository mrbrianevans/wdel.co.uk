

# Services

For each service that Whetstone can offer, write a separate page and link to it from a paragraph from the landing page.

Include case studies of prior work.

## Enterprise data warehouse

Content in Word doc and html page.

### Case study - Menzies

Like many mid-large accountancy firms, Menzies' practice management system stored data in an on-premises SQL database. 
Reporting was done with Power BI, connecting directly into the operational SQL Server database.
This had several drawbacks:
 - limited to data in SQL Server, doesn't include cloud software which exposes APIs. Eg Payroll software.
 - put tremendous strain on the on-prem SQL Server, sometimes tipping it over the edge.
 - dashboards based on an operational, normalised data model and database, which is not designed to serve analytics. slow and complex.
 - complex SQL logic in SQL Server VIEWs, not being version controlled, no change history or authorship info.
 - no dev environment for testing changes to VIEWs, making each update risky.
 - Power BI dashboards taking long to develop, requiring specialist expertise, incompatible with modern LLM tooling

In January 2026, Whetstone Data Engineering Ltd deployed Brian Evans into the innovation team of Menzies to commence work on a modern cloud data warehouse.
Within the first month, the architectural pillars were established:
 - BigQuery as the data warehouse
 - Fivetran for prebuilt pipelines, Airflow for custom ingestion pipelines
 - dbt for SQL data modeling and transformation

Within 6 months, x major data sources had been ingested and were available for reporting.

We chose to implement the analytical data model following the Kimbal fact-dimension structure, which is the purpose-built industry standard for reporting and enables very high performance, while simplifying most common analytical queries.

We wrote the Airflow ingestion pipelines to detect changes in source data, to generate events in Pub/Sub which automations could use. 
This plugged the gap of some systems not providing webhook events.

To summarise how the solution addressed the drawbacks of the previous approach:
 - any data source could be used in reporting. Just a new ingestion pipeline and then available in BigQuery.
 - reporting workload distinct from operational systems, preventing analytics causing costly operational outages.
 - dashboards based on purpose-built data model and database. highly efficient, simply to design.
 - all SQL transformation logic from the source operational data to the analytical model was version controlled, providing full change history and authorship.
 - clone of production environment for testing changes without risking affecting business use cases.
 - reporting dashboards very easy to develop by more members of team, assisted by modern LLM tooling.


## Companies House integration

Whetstone Data Engineering's primary technical engineer, Brian Evans, has deep expertise working with Companies House data.
He has developed numerous ingestion pipelines for the UK company dataset over the last 5 years, and has gained close familiarity with the data products.

Whetstone offers a service to integrate the Companies House dataset in any business.
We can build an ingestion pipeline to integrate the data into an existing data warehouse, or build the warehouse from scratch.
We can integrate the data into an app or product, as well as for internal tooling and enriched reporting.
For example, an accountancy practice could use a live integration to keep track of upcoming accounts filing deadlines and company secretarial confirmation statement deadlines.

By "live integration", we mean an initial load of the current state of data, as well as a connection to the Streaming API to keep your copy of Companies House data always up-to-date.

The available data includes a list of all uk registered companies with their profile information, documents filed, appointed officers (directors), persons with significant control (beneficial owners), insolvency cases and charges/mortgages.

### Case study - Companies Warehouse built for Optimal Compliance

When: 2024
Platform: AWS
Datasets: Companies, Officers, Persons with significant control

### Case study - Filing Deadlines built for Somerset Accountancy Services

When: 2022
Platform: Digital Ocean
Datasets: Companies, filings

### Case study - Companies House data ingested into Enterprise Data Warehouse for Menzies

When: 2026
Platform: Google Cloud
Datasets: Companies

### Case study - Snapshot of current data supplied to Monzo Bank Limited to bootstrap their database

When: May 2026
Platform: Cloudflare
Datasets: Companies, Officers


