export class Exercises {
    constructor(abs, back, biceps, chest, calves, forearms, quadriceps, shoulders, triceps) {
        this.abs = abs;
        this.back = back;
        this.biceps = biceps;
        this.chest = chest;
        this.calves = calves;
        this.forearms = forearms;
        this.quadriceps = quadriceps;
        this.shoulders = shoulders;
        this.triceps = triceps;
    }

    // Provides an array of strings with the exercises that are enabled.
    enabledExercises() {
        const array = [];
        if (this.abs) {
            array.push('abs');
        }
        if (this.back) {
            array.push('back');
        }
        if (this.biceps) {
            array.push('biceps');
        }
        if (this.chest) {
            array.push('chest');
        }
        if (this.calves) {
            array.push('calves');
        }
        if (this.forearms) {
            array.push('forearms');
        }
        if (this.quadriceps) {
            array.push('quadriceps');
        }
        if (this.shoulders) {
            array.push('shoulders');
        }
        if (this.triceps) {
            array.push('triceps');
        }
        return array;
    }

    // Returns true if all the exercies are not enabled.
    shouldDelete() {
        let remove = true;
        if (this.abs) {
            remove = false;
        }
        if (this.back) {
            remove = false;
        }
        if (this.biceps) {
            remove = false;
        }
        if (this.chest) {
            remove = false;
        }
        if (this.calves) {
            remove = false;
        }
        if (this.forearms) {
            remove = false;
        }
        if (this.quadriceps) {
            remove = false;
        }
        if (this.shoulders) {
            remove = false;
        }
        if (this.triceps) {
            remove = false;
        }
        return remove;
    }
}

// Converter that allows store and retrieval for Firestore database.
export const converterExercises = {
    toFirestore: function (exercises) {
        return {
            abs: exercises.abs,
            back: exercises.back,
            biceps: exercises.biceps,
            chest: exercises.chest,
            calves: exercises.calves,
            forearms: exercises.forearms,
            quadriceps: exercises.quadriceps,
            shoulders: exercises.shoulders,
            triceps: exercises.triceps
        }
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Exercises(data.abs, data.back, data.biceps, data.chest, data.calves, data.forearms, data.quadriceps, data.shoulders, data.triceps)
    }
}

// Provides an exercise that will be diabled.
export function disableExcercise(exercise) {
    let data = {};
    if (exercise === 'abs') {
        data = { abs: false };
    }
    if (exercise === 'back') {
        data = { back: false };
    }
    if (exercise === 'biceps') {
        data = { biceps: false };
    }
    if (exercise === 'chest') {
        data = { chest: false };
    }
    if (exercise === 'calves') {
        data = { calves: false };
    }
    if (exercise === 'forearms') {
        data = { forearms: false };
    }
    if (exercise === 'quadriceps') {
        data = { quadriceps: false };
    }
    if (exercise === 'shoulders') {
        data = { shoulders: false };
    }
    if (exercise === 'triceps') {
        data = { triceps: false };
    }
    return data;
}
