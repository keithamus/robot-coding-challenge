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
            this.placeRobot(instructions);
        },

        placeRobot: function placeRobot(instructions) {
            var facing = this.facing,
                coords = this.coords || [0, 0];
            instructions.forEach(function (instruction) {
                if (instruction === 'L') {
                    facing = this.aboutFace(facing, -1);
                } else if (instruction === 'R') {
                    facing = this.aboutFace(facing, 1);
                } else if (instruction === 'F') {
                    coords = this.move(facing, coords);
                }
            }, this);
            this.facing = facing;
            this.coords = coords;
            this.el.style.left = (coords[0] * cordMultiplier) + 'rem';
            this.el.style.top = (coords[1] * cordMultiplier) + 'rem';
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
        }

    };

    return Robot;

}());
