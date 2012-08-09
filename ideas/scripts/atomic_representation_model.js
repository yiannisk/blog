var infinite = 9999999999;

//////////////////////////////////////////////////// Utilities
Utils = {};
Utils.degreesToRadians = function (d) {
    return d * Math.PI / 180;
}

Utils.positionFromVector = function (x, y, r, a) {
    return new Position(
        x + (r * Math.sin(Utils.degreesToRadians(a))),
        y + (r * Math.cos(Utils.degreesToRadians(a)))
    );
}

//////////////////////////////////////////////////// Element
function Position(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.clone = function () {
        return new Position(this.x, this.y);
    }
}

//////////////////////////////////////////////////// Element
function Element() {
    this.position = new Position();
}

//////////////////////////////////////////////////// Particle
function Particle() {
    var core = new Element();
    return core;
}

//////////////////////////////////////////////////// WaveParticle
function WaveParticle() {
    var core = new Element();
    core.vector = new { r: 90, d: 10 };
    return core;
}

//////////////////////////////////////////////////// Proton
function Proton() {
    var core = new Particle();
    core.particleType = "proton";
    return core;
}

Protons = {};
Protons.create = function (number) {
    var results = [];
    for (var i = 0; i < number; i ++)
        results.push(new Proton()); 
    return results;
}

//////////////////////////////////////////////////// Electron
function Electron(valence) {
    var core = new Particle();
    core.particleType = "electron";
    core.valence = valence;
    return core;
}

Electrons = {};
Electrons.create = function (number, valence) {
    var results = [];
    if (valence == null) valence = 0;
    
    if (number < valence)
        throw new Error("Can't have more valence electrons" 
            + "than electrons");
    
    for (var i = 0; i < number; i ++)
        results.push(new Electron(i < valence)); 
    
    return results;
}

//////////////////////////////////////////////////// Neutron
function Neutron() {
    var core = new Particle();
    core.particleType = "neutron";
    return core;
}

Neutrons = {};
Neutrons.create = function (number) {
    var results = [];
    for (var i = 0; i < number; i ++)
        results.push(new Neutron()); 
    return results;
}

//////////////////////////////////////////////////// Photon
function Photon() {
    var core = new WaveParticle();
    core.particleType = "photon";
    return core;
}

//////////////////////////////////////////////////// Atom
function Atom(protons, neutrons, electrons, symbol, fillStyle) {
    var core = new Element();
    
    core.protons = protons || [];
    core.neutrons = neutrons || [];
    core.electrons = electrons || [];
    core.symbol = symbol || "XXX";
    core.fillStyle = fillStyle || "rgba(99, 99, 99, 0.5)";
    
    core.clone = function () {
        return new Atom(core.protons, core.neutrons, core.electrons,
            core.symbol, core.fillStyle);
    };
    
    core.draw = function (ctx) {
        drawNucleus(ctx);
        drawText(ctx);
        drawRing(ctx);
        drawElectrons(ctx);
    }
    
    core.nucleusSize = function () {
        var total = core.protons.length + core.neutrons.length;
        return Math.log(Atom.SIZE_MODIFIER * total) * 10;
    }
    
    core.ringRadius = function () {
        return core.nucleusSize() + 15;
    }
    
    function drawNucleus(ctx) {
        ctx.beginPath();
        ctx.fillStyle = core.fillStyle;
        ctx.arc(core.position.x, core.position.y, core.nucleusSize(), 
            0, Math.PI*2, true);
        ctx.stroke();
        ctx.fill();
    }
    
    function drawText(ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.font = "12pt Arial Bold";
        var metrics = ctx.measureText(core.symbol)
        var positionX = core.position.x - (metrics.width / 2);
        var positionY = core.position.y + (metrics.width / 2);
        ctx.fillText(core.symbol, positionX, positionY);
    }
    
    function drawRing(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(99, 99, 99, 0.5)";
        ctx.arc(core.position.x, core.position.y, 
            core.ringRadius(), core.ringRadius(), 0, Math.PI*2, true);
        ctx.stroke();
    }
    
    function drawElectrons(ctx) {
        var valencePositions = [
            Utils.positionFromVector(
                core.position.x,
                core.position.y,
                core.ringRadius(),
                80
            ),
            Utils.positionFromVector(
                core.position.x,
                core.position.y,
                core.ringRadius(),
                100
            ),
            Utils.positionFromVector(
                core.position.x,
                core.position.y,
                core.ringRadius(),
                170
            ),
            Utils.positionFromVector(
                core.position.x,
                core.position.y,
                core.ringRadius(),
                190
            ),
            Utils.positionFromVector(
                core.position.x,
                core.position.y,
                core.ringRadius(),
                260
            ),
            Utils.positionFromVector(
                core.position.x,
                core.position.y,
                core.ringRadius(),
                280
            ),
            Utils.positionFromVector(
                core.position.x,
                core.position.y,
                core.ringRadius(),
                350
            ),
            Utils.positionFromVector(
                core.position.x,
                core.position.y,
                core.ringRadius(),
                10
            )
        ];
        
        var valenceElectrons = core.electrons.filter(function (el) {
           return el.valence; 
        });
        
        for(var i = 0; (i<valenceElectrons.length) && (i<8); i++) {
            var electron = valenceElectrons[i];
            electron.position = valencePositions[i];
            
            ctx.beginPath();
            ctx.fillStyle = "rgba(128, 128, 256, 1)";
            ctx.arc(electron.position.x, electron.position.y, 
                3, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.fill();
        }
    }
    
    return core;
}

//////////////////////////////////////////////////// Molecule
function Molecule(atoms) {
    var core = new Element();
    
    core.atoms = atoms || [];
    core.clone = function () {
        return new Molecule(core.atoms.map(function (el) {
            return el.clone();
        }));
    }
    
    core.draw = function (ctx) {
        for(var i = 0; i < core.atoms.length; i++) {
            var atom = core.atoms[i];
            atom.position = new Position(
                core.position.x + (i * 50),
                core.position.y + (i * 50)
            );
            atom.draw(ctx);
        }
    }
    
    return core;
}

//////////////////////////////////////////////////// Atoms
Atom['uranium235'] = new Atom(
    Protons.create(92), 
    Neutrons.create(143), 
    Electrons.create(92, 6), 
    "U", "rgba(160, 00, 160, 0.5)");

Atom['oxygen'] = new Atom(
    Protons.create(8), 
    Neutrons.create(8), 
    Electrons.create(8, 2),
    "O", "rgba(255, 255, 255, 0.5)");
    

//////////////////////////////////////////////////// Molecules
Molecule['uraniumDioxide'] = new Molecule([
   Atom.uranium235.clone(),
   Atom.oxygen.clone(),
   Atom.oxygen.clone() 
]);

Molecule['uraniumTrioxide'] = Molecule.uraniumDioxide.clone();
Molecule['uraniumTrioxide'].atoms.push(Atom.oxygen.clone());

//////////////////////////////////////////////////// Settings
Atom.SIZE_MODIFIER = .5;