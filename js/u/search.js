// searchModule.js
var SearchModule = (function() {
    var formSelector = '.search-form';
    var inputSelector = 'input[type="text"]';
    var resultsSelector = '#search-results';
    var data = [];

    function init(options) {
        options = options || {};
        formSelector = options.formSelector || formSelector;
        inputSelector = options.inputSelector || inputSelector;
        resultsSelector = options.resultsSelector || resultsSelector;
        data = options.data || data;

        var searchForm = document.querySelector(formSelector);
        if (!searchForm) return;

        var searchInput = searchForm.querySelector(inputSelector);
        var searchResults = document.querySelector(resultsSelector);

        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var query = searchInput.value.trim().toLowerCase();
            if (!query) {
                searchResults.innerHTML = '<p>Masukkan kata kunci pencarian.</p>';
                return;
            }
            performSearch(query, searchResults);
        });
    }

    function performSearch(query, resultsContainer) {
        var filtered = data.filter(function(item) {
            return item.title.toLowerCase().indexOf(query) !== -1 ||
                item.description.toLowerCase().indexOf(query) !== -1;
        });

        if (filtered.length === 0) {
            resultsContainer.innerHTML = '<p>Tidak ada hasil ditemukan.</p>';
            return;
        }

        var html = filtered.map(function(item) {
            return '<div class="search-result-item">' +
                '<a href="' + item.url + '" tabindex="0">' +
                '<h4>' + item.title + '</h4>' +
                '<p>' + item.description + '</p>' +
                '</a></div>';
        }).join('');

        resultsContainer.innerHTML = html;
    }

    return {
        init: init
    };
})();
