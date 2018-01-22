$(function(){

    // FUNKCJE POMOCNICZE
    function initSortable() {
        $('.card-list').sortable({
            connectWith: '.card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
        var str = '', i;
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    // KANBAN
    var board = {
        name: 'Tablica Kanban',
        createColumn: function(column) {
            this.element.append(column.element);
            initSortable();
        },
        element: $('#board .column-container')
    };

    $('.create-column')
        .click(function(){
            board.createColumn(new Column(prompt('Wpisz nazwę kolumny')));
        });

    // KLASA KANBAN COLUMN
    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.element = createColumn();

        function createColumn() {
            // TWORZENIE NOWYCH WĘZŁÓW
            var column = $('<div class="column"></div>');
            var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
            var columnCardList = $('<ul class="card-list"></ul>');
            var columnDelete = $('<button class="btn-delete">x</button>');
            var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');

            // PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
            columnDelete.click(function() {
                self.deleteColumn();
            });
            columnAddCard.click(function(event) {
                event.preventDefault();
                self.createCard(new Card(prompt("Wpisz nazwę karty")));
            });

            // KONSTRUOWANIE ELEMENTU KOLUMNY
            column.append(columnTitle)
                .append(columnDelete)
                .append(columnAddCard)
                .append(columnCardList);
            return column;
        }
    }
    Column.prototype = {
        createCard: function(card) {
            this.element.children('ul').append(card.element);
        },
        deleteColumn: function() {
            this.element.remove();
        }
    };

    // KLASA KANBAN CARD
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.element = createCard();

        function createCard() {
            var card = $('<li class="card"></li>');
            var cardDeleteBtn = $('<button class="btn-delete">x</button>');
            var cardDescription = $('<p class="card-description"></p>');
            cardDeleteBtn.click(function(){
                self.removeCard();
            });
            card.append(cardDeleteBtn);
            cardDescription.text(self.description);
            card.append(cardDescription)
            return card;
        }
    }
    Card.prototype = {
        removeCard: function() {
            this.element.remove();
        }
    }

    // TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
    var todoColumn = new Column('Do zrobienia');
    var doingColumn = new Column('W trakcie');
    var doneColumn = new Column('Skończone');

    // DODAWANIE KOLUMN DO TABLICY
    board.createColumn(todoColumn);
    board.createColumn(doingColumn);
    board.createColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card('Nowe zadanie');
    var card2 = new Card('stworzyc tablice kanban');

    // DODAWANIE KART DO KOLUMN
    todoColumn.createCard(card1);
    doingColumn.createCard(card2);
})



/* $(function() {

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    // CREATING COLUMNS

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {

            // CREATING COMPONENTS OF COLUMNS
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

            // ADDING EVENTS
            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });

            // CONSTRUCTION COLUMN ELEMENT
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

            // RETURN OF CREATED COLUMN
            return $column;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

    // CREATING CARDS

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {

            // CREATING THE BLOCKS
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            // BINDING TO CLICK EVENT
            $cardDelete.click(function(){
                self.removeCard();
            });

            // COMBINING BLOCKS AND RETURNING THE CARD
            $card.append($cardDelete)
                .append($cardDescription);

            return $card;
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }

    }

    // BOARD

    var board =  {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
            },

            $element: $('#board .column-container')

    };

    $('.create-column')
        .click(
            function(){
                var name = prompt('Enter a column name');
                var column = new Column(name);
                board.addColumn(column);
            }
        );




    // DRAG'N'DROP

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }


    // CREATING COLUMNS
        var todoColumn = new Column('To do');
        var doingColumn = new Column('Doing');
        var doneColumn = new Column('Done');

    // ADDING COLUMNS TO THE BOARD
        board.addColumn(todoColumn);
        board.addColumn(doingColumn);
        board.addColumn(doneColumn);

    // CREATING CARDS
        var card1 = new Card('New task');
        var card2 = new Card('Create kanban boards');

    // ADDING CARDS TO COLUMNS
        todoColumn.addCard(card1);
        doingColumn.addCard(card2);
}) */