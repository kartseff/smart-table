import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // #5.1 — создаём компаратор
    const compare = createComparison(
        ['skipEmptyTargetValues'],
        [
            rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
        ]
    );

    return (data, state, action) => {
        // #5.2 — если строка поиска пустая, не фильтруем
        if (!state[searchField] || state[searchField].trim() === "") {
            return data;
        }

        return data.filter(row => compare(row, state));
    }
}
