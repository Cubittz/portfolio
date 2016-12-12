(function() {
    'use strict';
    var Point2 = function(x, y) {
        this.x = x;
        this.y = y;
    }

    var Point3 = function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    var Cube = function(centre, size) {
        const d = size / 2;

        this.vertices = [
            new Point3(centre.x - d, centre.y - d, centre.z - d),
            new Point3(centre.x - d, centre.y - d, centre.z + d),
            new Point3(centre.x + d, centre.y - d, centre.z - d),
            new Point3(centre.x + d, centre.y - d, centre.z + d),
            new Point3(centre.x + d, centre.y + d, centre.z - d),
            new Point3(centre.x + d, centre.y + d, centre.z + d),
            new Point3(centre.x - d, centre.y + d, centre.z - d),
            new Point3(centre.x - d, centre.y + d, centre.z + d),
        ];

        this.faces = [
            [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
            [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
            [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
            [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
            [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
            [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
        ]
    }

    Cube.prototype.render = function(container, dx, dy) {
        container.innerHTML = "";
        for (let i = 0; i < this.faces.length; i++) {
            let face = this.faces[i];
            let point = Project(face[0]);
            var str = '<path d="M ${point.x + dx} ${-point.y + dy}';
            for (let j = 1; j < face.length; j++) {
                point = Project(face[j]);
                str += ' L ${point.x + dx} ${point.y + dy}';
            }
            str += ' Z" fill="rgba(205, 0, 175, .1)" stroke="rgba(0, 0, 0, .1)">';
        container.innerHTML += str;
        }
    };

    const Project = (vertice) => new Point2(vertice.x, vertice.z);

    const container = document.querySelector('svg');
    const width = container.attributes.width.value;
    const height = container.attributes.height.value;
    const dx = width / 2;
    const dy = height / 2;
    const centre = new Point3(0, dy, 0);
    const cube = new Cube(centre, dy);

    cube.render(container, dx, dy);
}());
