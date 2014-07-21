window.Robot = (function () {

    var faces = ['N', 'E', 'S', 'W'],
        cordMultiplier = 4;

    function Robot() {
        this.el = document.createElement('div');
        this.el.id = 'robot' + Math.round(Math.random() * 100);
        this.el.className = 'robot';
        this.el.setAttribute('facing', faces[0]);
        this.el.style.top = '0';
        this.el.style.left = '0';
        this.coords = [0, 0];
        document.body.appendChild(this.el);
    }

    Robot.prototype = {
        constructor: Robot,

        instructionTime: 250,

        get facing() {
            return this.el.getAttribute('facing');
        },

        set facing(value) {
            this.el.setAttribute('facing', value);
        },

        command: function robotCommand(instructions) {
            if (typeof instructions === 'string') {
                instructions = instructions.split('');
            }
            this.placeFlag(this.calculateFinalCoords(instructions));
            this.runQueue(instructions);
        },

        placeFlag: function placeFlag(coords) {
            if (!this.flagEl) {
                this.flagEl = document.createElement('div');
                this.flagEl.className = 'flag';
                document.body.appendChild(this.flagEl);
            }
            this.flagEl.style.left = (coords[0] * cordMultiplier) + 'rem';
            this.flagEl.style.top = (coords[1] * cordMultiplier) + 'rem';
        },

        calculateFinalCoords: function calculateFinalCoords(instructions) {
            var facing = this.facing,
                coords = this.coords;
            instructions.forEach(function (instruction) {
                if (instruction === 'L') {
                    facing = this.aboutFace(facing, -1);
                } else if (instruction === 'R') {
                    facing = this.aboutFace(facing, 1);
                } else if (instruction === 'F') {
                    coords = this.move(facing, coords);
                }
            }, this);
            return coords;
        },

        aboutFace: function aboutFace(facing, turn) {
            var newFaceIndex = faces.indexOf(facing) + turn;
            if (!faces[newFaceIndex]) {
                newFaceIndex = 0;
            }
            return faces[newFaceIndex];
        },

        move: function move(direction, existingCoords) {
            existingCoords = (existingCoords || [0, 0]).slice();
            switch(direction) {
                case 'N':
                    existingCoords[1] -= 1;
                    break;
                case 'E':
                    existingCoords[0] += 1;
                    break;
                case 'S':
                    existingCoords[1] += 1;
                    break;
                case 'W':
                    existingCoords[0] -= 1;
                    break;
            }
            return existingCoords;
        },

        runQueue: function runQueue(instructions) {
            if (instructions.length) {
                var instruction = instructions.shift();
                console.debug('Running command ', instruction);
                if (instruction === 'L') {
                    this.facing = this.aboutFace(this.facing, -1);
                } else if (instruction === 'R') {
                    this.facing = this.aboutFace(this.facing, 1);
                } else if (instruction === 'F') {
                    this.coords = this.move(this.facing, this.coords);
                    this.el.style.left = (this.coords[0] * cordMultiplier) + 'rem';
                    this.el.style.top = (this.coords[1] * cordMultiplier) + 'rem';
                }
                setTimeout(this.runQueue.bind(this, instructions), this.instructionTime);
                return true;
            }
            return false;
        },

    };

    return Robot;

}());
