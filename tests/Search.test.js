const test = require('ava').default;
const got = require('got');
const http = require('http');
const listen = require('test-listen');
const app = require('../index'); 

const {getAllExercises} = require('../service/DefaultService');


test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ http2: true, throwHttpErrors: false , responseType: "json", prefixUrl: t.context.prefixUrl });
  }); 
  
  test.after((t) => {
      t.context.server.close();
  }); 
  
    //Δημιουργω δεδομένα mock για ασκησεις 
    const mockExercise1 = {
        Title: "Bench Press",
        exerciseImage: "https://workoutlabs.com/train/svg.php?id=84755" ,
        explanationVideo: {
            duration: "2:56 minutes",
            videoURL: "https://www.youtube.com/watch?v=gRVjAtPip0Y&ab_channel=BuffDudes",
            thumbnail: "https://workoutlabs.com/train/svg.php?id=84755"
        }};

     const mockExercise2 = {
        Title: "Incline Bench Press",
        exerciseImage: "https://homegymreview.co.uk/wp-content/uploads/exercises/11731101-Barbell-Incline-Wide-Reverse-grip-Bench-Press_Chest_max-scaled.jpg",
        explanationVideo: {
            duration: "1:59",
            videoURL: "https://www.youtube.com/watch?v=IP4oeKh1Sd4&t=21s&ab_channel=MaxEuceda",
            thumbnail: "https://homegymreview.co.uk/wp-content/uploads/exercises/11731101-Barbell-Incline-Wide-Reverse-grip-Bench-Press_Chest_max-scaled.jpg"
        }};


        const mockExercise3 = {
            Title: "Leg extensions",
            exerciseImage: "https://training.fit/wp-content/uploads/2020/03/beinstrecken-geraet-1.png",
            explanationVideo: {
                duration: "0:23",
                videoURL: "https://www.youtube.com/watch?v=MpEydcQ1oDw&ab_channel=HammerStrength",
                thumbnail: "https://training.fit/wp-content/uploads/2020/03/beinstrecken-geraet-1.png"
            }};

        const mockExercise4 = {
            Title: "Leg press",
            exerciseImage: "https://fitlineequipment.com/wp-content/uploads/2019/05/Precor-DPL0601-Angled-Leg-Press-4.jpg",
            explanationVideo: {
                duration: "0:23",
                videoURL: "https://www.youtube.com/watch?v=nbUUzL_xzGE&ab_channel=TitanFitness",
                thumbnail: "https://fitlineequipment.com/wp-content/uploads/2019/05/Precor-DPL0601-Angled-Leg-Press-4.jpg"
        }};

        const mockExercises = [
            mockExercise1,
            mockExercise2,
            mockExercise3,
            mockExercise4
        ];  

    /*        const mockFilters = {
            "chest": [
                "Bench Press",
                "Incline Bench Press"
            ],
            "legs": [
                "Leg extensions",
                "Leg press"
            ],
            "core": []
        };
*/

        const mockFilters =[
            {
                "name": "chest",
                "exercises": [
                    "Bench Press",
                    "Incline Bench Press"
                ]
            },
            {
                "name": "legs",
                "exercises": [
                    "Leg extensions",
                    "Leg press"
                ]
            },
            {
                "name": "core",
                "exercises": []
            }
        ]
        
        
        test('GET/ Search exercise returns the correct exercise based on searchText', async t => {
            let searchText = 'BENCH  PRESS'; 
            
            // το tolowerCase ωστε να μήν έχω προβλημα με διαφορά στα κεφαλαία μικρα, και replace για τα κενά (τα αφαιρει)
            t.true(mockExercise1.Title.replace(/\s+/g, '').toLowerCase() === searchText.replace(/\s+/g, '').toLowerCase());
            searchText = ' benchpress'; 
            t.true(mockExercise1.Title.replace(/\s+/g, '').toLowerCase() === searchText.replace(/\s+/g, '').toLowerCase());
            searchText = 'BeN cH Pr ESs  '; 
            t.true(mockExercise1.Title.replace(/\s+/g, '').toLowerCase() === searchText.replace(/\s+/g, '').toLowerCase());
            
        });

      
        test('GET / Partial search text should still return the correct exercise', async t => {
            let partialSearchText = 'Bench'; // ένα μέρος του string
            t.true(mockExercise1.Title.replace(/\s+/g, '').toLowerCase().includes(partialSearchText.replace(/\s+/g, '').toLowerCase()));
            t.true(mockExercise2.Title.replace(/\s+/g, '').toLowerCase().includes(partialSearchText.replace(/\s+/g, '').toLowerCase()));

            partialSearchText = 'be nch'; 
            t.true(mockExercise1.Title.replace(/\s+/g, '').toLowerCase().includes(partialSearchText.replace(/\s+/g, '').toLowerCase()));
            t.true(mockExercise2.Title.replace(/\s+/g, '').toLowerCase().includes(partialSearchText.replace(/\s+/g, '').toLowerCase()));

            partialSearchText = 'PRES'; 
            t.true(mockExercise1.Title.replace(/\s+/g, '').toLowerCase().includes(partialSearchText.replace(/\s+/g, '').toLowerCase()));
            t.true(mockExercise2.Title.replace(/\s+/g, '').toLowerCase().includes(partialSearchText.replace(/\s+/g, '').toLowerCase()));
        });



    test('GET/ Search should return many exercises', async t => {
 
        let searchText = 'Bench';  
        let foundExercises = mockExercises.filter(exercise =>
            exercise.Title.replace(/\s+/g, '').toLowerCase().includes(searchText.replace(/\s+/g, '').toLowerCase())
        );
        t.is(foundExercises.length, 2); //ελέγχω αν υπάρχουν 2 ασκησεις που περιεχουν το searchText
        t.is(foundExercises[0].exerciseImage, "https://workoutlabs.com/train/svg.php?id=84755");
        t.is(foundExercises[1].exerciseImage, "https://homegymreview.co.uk/wp-content/uploads/exercises/11731101-Barbell-Incline-Wide-Reverse-grip-Bench-Press_Chest_max-scaled.jpg");
        // Για να ελένξω αν πήρε τις σωστες ασκήσεις και δεν βγήκε τυχαία τον αριθμό ελέγχω αν ειναι η σωστη εικόνα

        searchText = 'LeG';  
        foundExercises = mockExercises.filter(exercise =>
            exercise.Title.replace(/\s+/g, '').toLowerCase().includes(searchText.replace(/\s+/g, '').toLowerCase())
        );

        t.is(foundExercises.length, 2);
        t.is(foundExercises[0].exerciseImage, "https://training.fit/wp-content/uploads/2020/03/beinstrecken-geraet-1.png");
        t.is(foundExercises[1].exerciseImage, "https://fitlineequipment.com/wp-content/uploads/2019/05/Precor-DPL0601-Angled-Leg-Press-4.jpg");

        searchText = 'Pre ss';  
        foundExercises = mockExercises.filter(exercise =>
            exercise.Title.replace(/\s+/g, '').toLowerCase().includes(searchText.replace(/\s+/g, '').toLowerCase())
        );

        t.is(foundExercises.length, 3);
        t.is(foundExercises[0].exerciseImage, "https://workoutlabs.com/train/svg.php?id=84755");
        t.is(foundExercises[1].exerciseImage, "https://homegymreview.co.uk/wp-content/uploads/exercises/11731101-Barbell-Incline-Wide-Reverse-grip-Bench-Press_Chest_max-scaled.jpg");
        t.is(foundExercises[2].exerciseImage, "https://fitlineequipment.com/wp-content/uploads/2019/05/Precor-DPL0601-Angled-Leg-Press-4.jpg");

    });

    test('GET/ Search with invalid exercise name returns 0 exercises', async t => {
        let searchText = ' invalid Exercise';  //searchText που δεν αντιστοιχεί σε καμία άσκηση
        let foundExercises = mockExercises.filter(exercise =>
            exercise.Title.replace(/\s+/g, '').toLowerCase().includes(searchText.replace(/\s+/g, '').toLowerCase())
        );
        t.is(foundExercises.length, 0, 'No exercises should be found with incorrect search text');

        searchText = 'Plank';  
        foundExercises = mockExercises.filter(exercise =>
        exercise.Title.replace(/\s+/g, '').toLowerCase().includes(searchText.replace(/\s+/g, '').toLowerCase())
        );
        t.is(foundExercises.length, 0, 'No exercises should be found with incorrect search text');

        searchText = 'Wrong Chest';  
        foundExercises = mockExercises.filter(exercise =>
        exercise.Title.replace(/\s+/g, '').toLowerCase().includes(searchText.replace(/\s+/g, '').toLowerCase())
        );
        t.is(foundExercises.length, 0, 'No exercises should be found with incorrect search text');        

    });

    test('Filter exercises by category', async t => {
        let categoryFilter = mockFilters.find(Filter => Filter.name === "chest");
        console.log(categoryFilter);
        t.deepEqual(categoryFilter.exercises, ["Bench Press", "Incline Bench Press"]);

        categoryFilter = mockFilters.find(Filter => Filter.name === "legs");
        console.log(categoryFilter);
        t.deepEqual(categoryFilter.exercises, ["Leg extensions", "Leg press"]);

        categoryFilter = mockFilters.find(Filter => Filter.name === "core");
        console.log(categoryFilter);
        t.deepEqual(categoryFilter.exercises, []);


        // isos na prostheso to an einai keno "" to filter
    });


    



    