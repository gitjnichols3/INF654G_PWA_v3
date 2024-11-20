# INF654G_PWA_v3
Version 3 of PWA with IndexedDB and FireBase


•	Explain how Firebase and IndexedDB are integrated into your application.

The app home page (index.html) allows users to add gigs to a gig tracker, making a list of concerts they may want to attend. It is driven by a form that communicates with a FireBase database and syncs to the local IndexedDB database as well. It can work in online and offline modes and will sync offline data to the FireBase DB when online access returns.

•	Provide instructions for using CRUD operations in both online and offline modes.

  To create an online document, hit the + button on the homepage labelled "Click to add Gigs", fill out the form and hit the add button.
  The app will add a gig to FireBase and IndexedDB and read the data back to add a new item to the web page including all the submitted info.
  To update a document, click on the pencil icon in any gig item on the home page. This will activate the form, populated with the data from the item. Edit any of the data desired and hit the Edit button. The changes are commited back to the online FireBase DB, the local IndexedDB database, and to the webpage.
  To delete a gig item, press the garbage can icon. This will remove the document from both databases and the web page.

•	Describe how the synchronization process works, including how Firebase IDs are maintained.

All options work the same when offline, except that the data cannot read/write to the firebase DB. Instead it writes to IndexedDB only. Once online connectivity is retored, IndexedDB syncs with fireBaseDB, replacing the temporary IndexedDB ID with a consistent FireBase ID for all documents and copying any new IndexedDB stores to FireBase documents. When the user refreshes the web page, the items on the page are refreshed by the synced data.
