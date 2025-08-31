import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                .map(name => {
                    // @todo: создать и вернуть тег опции
                    const option = document.createElement("option");
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
        )
    })

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === "clear") {
            const field = action.dataset.field;
            const parent = action.parentElement;
            const input = parent.querySelector("input, select");

            if (input) {
                input.value = "";
            }
            if (field && state[field] !== undefined) {
                state[field] = "";
            }
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}