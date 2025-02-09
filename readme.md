Opdracht: Bouw een Voertuig Verkoop API
Doel
Bouw een RESTful API waarmee auto's en motorfietsen kunnen worden beheerd. Gebruik Node.js met
Express en Mongoose. Structuur je code in modellen, controllers en routes. Gebruik typescript.
Eisen
1. Models:
   Voertuig Model:
   Merk (String, verplicht)
   Model (String, verplicht)
   Bouwjaar (Number, verplicht)
   Prijs (Number, verplicht)
   enum: ["auto", "moto"] (String, verplicht) - enum / tuple gebruiken
   cilinderinhoud: { type: Number, required: function () { return this.type === "moto"; } }
   User Model:
   naam (String, verplicht)
   email (String, verplicht, uniek)
   avatar (String, optioneel, standaardafbeelding indien niet meegegeven) https://
   greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png of dergelijke als default
   wachtwoord (String, verplicht, gehashed voor veiligheid)
   favorieten (Array, met ref naar voertuig, die de id's opslaan van voertuigen)
2. Controllers:
   CRUD-functionaliteit voor beide modellen:
   Create: Voeg een nieuw voertuig toe.
   Read: Haal alle voertuigen op, of zoek op basis van merk of bouwjaar.
   Update: Werk voertuiggegevens bij.
   Delete: Verwijder een voertuig uit de database.
3. Routes:
   POST /voertuig - Voeg een nieuw voertuig toe.
   GET /voertuig return object. Meer info benenden.
- Haal alle voertuigen op en bij alle moto's voeg het soort rijbewijs toe aan het
  GET /voertuig/:id - Haal een specifiek voertuig op.
  PUT /voertuig/:id - Werk een specifiek voertuig bij.
  DELETE /voertuig/:id - Verwijder een specifiek voertuig.
4. Extra Functionaliteiten:
   Implementeer filtering op prijsbereik (bijv. /voertuigen?
   type=auto&minPrijs=10000&maxPrijs=20000).
   Voeg paginering toe voor grote datasets.
5. Database:
   Gebruik MongoDB mongoose
6. Info:
   125cc A1 rijbewijs - tussen 126 en 500cc A2 rijbewijs - hoger dan 500cc A rijbewijs (klopt niet
   helemaal met realiteit dus het is fictief)
   Met de user model moet je niets doen, Hier werken we later samen op verder.