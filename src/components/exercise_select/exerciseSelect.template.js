export const exerciseSelectTemplate = model => `               
    <label for="${model.id}"><img id="${model.id}Img" src="" /></label>
    <select class="custom-select" id="${model.id}" required>
        <option selected disabled value="">Choose...</option>
        <option value="abs">Abs</option>
        <option value="back">Back</option>
        <option value="biceps">Biceps</option>
        <option value="chest">Chest</option>
        <option value="calves">Calves</option>
        <option value="forearms">Forearms</option>
        <option value="quadriceps">Quadriceps</option>
        <option value="shoulders">Shoulders</option>
        <option value="triceps">Triceps</option>
    </select>
    <div class="invalid-feedback">
        Please select an exercise.
    </div>
`;
