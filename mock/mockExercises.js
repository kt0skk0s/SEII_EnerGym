//Δημιουργία της πρώτης εικονικής άσκησης
const mockExercise1 = {
    Title: "Bench Press",
    exerciseImage: "https://workoutlabs.com/train/svg.php?id=84755",
    explanationVideo: {
        duration: "2:56 minutes",
        videoURL: "https://www.youtube.com/watch?v=gRVjAtPip0Y&ab_channel=BuffDudes",
        thumbnail: "https://workoutlabs.com/train/svg.php?id=84755"
    }
};

//Δημιουργία της δεύτερης εικονικής άσκησης
const mockExercise2 = {
    Title: "Incline Bench Press",
    exerciseImage: "https://homegymreview.co.uk/wp-content/uploads/exercises/11731101-Barbell-Incline-Wide-Reverse-grip-Bench-Press_Chest_max-scaled.jpg",
    explanationVideo: {
        duration: "1:59",
        videoURL: "https://www.youtube.com/watch?v=IP4oeKh1Sd4&t=21s&ab_channel=MaxEuceda",
        thumbnail: "https://homegymreview.co.uk/wp-content/uploads/exercises/11731101-Barbell-Incline-Wide-Reverse-grip-Bench-Press_Chest_max-scaled.jpg"
    }
};

//Δημιουργία της τρίτης εικονικής άσκησης
const mockExercise3 = {
    Title: "Leg extensions",
    exerciseImage: "https://training.fit/wp-content/uploads/2020/03/beinstrecken-geraet-1.png",
    explanationVideo: {
        duration: "0:23",
        videoURL: "https://www.youtube.com/watch?v=MpEydcQ1oDw&ab_channel=HammerStrength",
        thumbnail: "https://training.fit/wp-content/uploads/2020/03/beinstrecken-geraet-1.png"
    }
};

//Δημιουργία της τέταρτης εικονικής άσκησης
const mockExercise4 = {
    Title: "Leg press",
    exerciseImage: "https://fitlineequipment.com/wp-content/uploads/2019/05/Precor-DPL0601-Angled-Leg-Press-4.jpg",
    explanationVideo: {
        duration: "0:23",
        videoURL: "https://www.youtube.com/watch?v=nbUUzL_xzGE&ab_channel=TitanFitness",
        thumbnail: "https://fitlineequipment.com/wp-content/uploads/2019/05/Precor-DPL0601-Angled-Leg-Press-4.jpg"
    }
};

// Εξαγωγή των mock αντικειμένων
module.exports = {
    mockExercise1,
    mockExercise2,
    mockExercise3,
    mockExercise4
};
