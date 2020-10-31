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

    excercisesList() {
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
}

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

export function shouldDeleteExcercises(exercises) {
    let remove = true;
    if (exercises.abs) {
        remove = false;
    }
    if (exercises.back) {
        remove = false;
    }
    if (exercises.biceps) {
        remove = false;
    }
    if (exercises.chest) {
        remove = false;
    }
    if (exercises.calves) {
        remove = false;
    }
    if (exercises.forearms) {
        remove = false;
    }
    if (exercises.quadriceps) {
        remove = false;
    }
    if (exercises.shoulders) {
        remove = false;
    }
    if (exercises.triceps) {
        remove = false;
    }
    return remove;
}
