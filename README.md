Link catre aplicatia publicata in Verecel: https://simpre2025-cloud-computing-proiect.vercel.app/records
Link catre videoclipul de prezentare de pe YouTube: https://youtu.be/0W-vZLMAXhQ
Link catre GitHub: https://github.com/CosminOprescu/Simpre2025CloudComputing

Documentatie:

Academia de Studii Economice din București
Facultatea de Cibernetică, Statistică și Informatică Economică







Documentație - Proiect Cloud Computing
My Music Vault App




Profesor coordonator:
Conf. Dr. Carmen Timofte
Student:
Oprescu Cosmin-Ioan
SIMPRE, Grupa 1133








2025
Link-uri utile:
Link acces GitHub: https://github.com/CosminOprescu/Simpre2025CloudComputing
Link acces aplicație: https://simpre2025-cloud-computing-proiect.vercel.app/records
Link acces video prezentare: https://youtu.be/0W-vZLMAXhQ

1. Introducere
	Aplicația dezvoltată în cadrul proiectului de seminar se numește My Music Vault și scopul principal al acesteia este sa funcționeze asemenea unei biblioteci muzicale sau a unui playlist pentru toți iubitorii de muzică. Utilizatorii pot adăuga, edita și șterge melodii după bunul plac, dar au la dispoziție și API-ul Deezer, o platformă de muzică în  clo	ud, prin intermediul căruia aceștia pot căuta orice melodie și o pot importa în cadrul aplicației My Music Vault. 

2. Descrierea problemei
În era digitală, utilizatorii consumă muzică printr-o multitudine de aplicații și platforme de streaming, precum Spotify, YouTube sau Apple Music. Deși aceste aplicații oferă acces la un vast catalog muzical, ele nu permit personalizarea și organizarea extensivă a melodiilor într-o arhivă proprie, în afara ecosistemului platformei respective. Utilizatorii nu pot adăuga comentarii personale, metadate adiționale sau structuri personalizate care să reflecte gusturile lor unice.
Aplicația My Music Vault răspunde acestei nevoi, oferind un spațiu digital personal în care utilizatorii își pot construi o colecție muzicală exact așa cum își doresc. Ei pot adăuga manual melodii, completând detalii precum titlul, artistul, anul, albumul, genul muzical sau comentarii proprii. Astfel, aplicația nu este doar o bază de date muzicală, ci și un jurnal muzical personalizat.
Mai mult, pentru a îmbunătăți experiența de utilizare și a accelera procesul de creare a colecției, aplicația integrează funcționalități de import automatizat din Deezer, o platformă de muzică în cloud. Utilizatorii pot căuta melodii în catalogul Deezer direct din aplicație, asculta un preview și importa instant melodia în arhiva personală, completată cu informații esențiale.
Această abordare creează o punte între explorarea muzicii și organizarea personalizată a acesteia, oferind o soluție unică, flexibilă și intuitivă pentru pasionații de muzică care doresc control complet asupra propriei colecții.

3. Descriere API
Aplicația My Music Vault utilizează un API REST intern, construit în Next.js, pentru a permite interacțiunea cu baza de date MongoDB. Acest API gestionează operațiile CRUD (Create, Read, Update, Delete) asupra colecției muzicale a utilizatorului.
 
Un alt API folosit pentru a căuta melodii în timp real este platforma Deezer. Răspunsul include informații precum titlul piesei, artistul, albumul, link către preview audio și copertă. Acestea pot fi apoi importate în aplicație printr-un singur click.
 

4. Fluxul de date
	Prima interacțiune a utilizatorului cu aplicația My Music Vault este Home Page-ul. 
 


	Următoarea secvență de cod prezintă API-ul de Deezer care ajută la colectarea informațiilor necesare pentru a importarea și ascultarea melodiilor dorite de către utilizator. 
 
 
	
Pentru adăugarea informațiilor despre melodii, am creat și un mic formular cu toate câmpurile necesare.
 

5. Capturi de ecran ale aplicației

 
Home Page
  
Formularul utilizat atât pentru adăugarea, cât și pentru editarea unei melodii
 
Captura de ecran din Deezer cu câteva dintre melodiile găsite

6. Referințe
Deezer API - https://developers.deezer.com/api
MongoDb Atlas - https://www.mongodb.com/products/platform/atlas-database
Next.js Documentation - https://nextjs.org/docs
