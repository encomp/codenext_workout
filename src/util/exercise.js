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

export function excercisesList(exercises) {
    const array = [];
    if (exercises.abs) {
        array.push('abs');
    }
    if (exercises.back) {
        array.push('back');
    }
    if (exercises.biceps) {
        array.push('biceps');
    }
    if (exercises.chest) {
        array.push('chest');
    }
    if (exercises.calves) {
        array.push('calves');
    }
    if (exercises.forearms) {
        array.push('forearms');
    }
    if (exercises.quadriceps) {
        array.push('quadriceps');
    }
    if (exercises.shoulders) {
        array.push('shoulders');
    }
    if (exercises.triceps) {
        array.push('triceps');
    }
    return array;
}
