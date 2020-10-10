new Vue({
    el: "#app",
    data: {
        player_heal: 100,
        monster_heal: 100,
        game_is_on: false,
        logs: []
    },
    methods: {
        start_game: function () {
            this.game_is_on = true;
        },
        attack: function () {
            var point = Math.ceil(Math.random() * 10);
            this.monster_heal -= point;
            this.add_to_logs({ turn: "p", text: "Oyuncunun verdiği hasar(" + point + ")" })
            this.monster_attack();
        },
        monster_attack: function () {
            var point = Math.ceil(Math.random() * 15);
            this.add_to_logs({ turn: "m", text: "Canavarın verdiği hasar(" + point + ")" })
            this.player_heal -= point;
        },
        special_attack: function () {
            var point = Math.ceil(Math.random() * 25);
            this.monster_heal -= point;
            this.add_to_logs({ turn: "p", text: "Oyuncunun verdiği özel hasar(" + point + ")" })
            this.monster_attack();
        },
        heal_up: function () {
            var heal = Math.ceil(Math.random() * 20);
            this.player_heal += heal;
            this.add_to_logs({ turn: "p", text: "Oyuncunun aldığı can(" + heal + ")" })
            this.monster_attack();
        },
        give_up: function () {
            this.player_heal = 0;
            this.add_to_logs({ turn: "p", text: "Oyuncu pes etti." })
        },
        add_to_logs: function (log) {
            this.logs.push(log);
        }
    },
    watch: {
        player_heal: function (value) {
            if (value <= 0) {
                this.player_heal = 0;
                if (confirm("Oyunu kaybettin. Tekrar dene?")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.player_heal = 100;
            }
        },
        monster_heal: function (value) {
            if (value <= 0) {
                this.monster_heal = 0;
                if (confirm("Oyunu kazandın. Tekrar dene?")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.monster_heal = 100;
            }
        }
    }
})