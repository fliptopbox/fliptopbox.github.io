
const {Scene, Color4, ArcRotateCamera, Vector3, SceneLoader, Engine} = BABYLON;
const body = document.querySelector('body');
const canvas = document.getElementById('renderCanvas');

let engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';

let scene = delayCreateScene();
engine.runRenderLoop(() => (scene ? scene.render() : null));

window.addEventListener('resize', () => engine.resize());



function delayCreateScene() {
    // Create a scene.
    const pos = { x: -1.893, y: 2.718, z: 1.2493 };
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
        'camera',
        0,
        0,
        0,
        new Vector3(0, 0, 0),
        scene
    );

    SceneLoader.Append('./scenes/', 'scene.glb', scene);

    window.camera = camera;
    camera.setPosition(pos);
    camera.attachControl(canvas, true);

    clampMouseWheel(camera, false);
    firstPostition(camera);
    colorLoop();

    return scene;
}

function createDefaultEngine() {
    return new Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
    });
}

function firstPostition(cam, radius = 2) {
    // animate into fist position
    let { alpha, beta } = cam;
    for (let s = 0, i = 0; i < radius; i += 0.01) {
        const q = Number(i);
        s += 1;
        setTimeout(function() {
            //console.log(q, s, q * 12);
            cam.radius = Number(q);
            cam.beta = beta * (q / radius);
            cam.alpha = alpha * (q / radius);
        }, s * 5);
    }
}

function clampMouseWheel(cam, clamp = true) {
    if(!clamp) return;
    // clamp the mouse wheel from zooming
    cam.lowerRadiusLimit = cam.radius;
    cam.upperRadiusLimit = cam.radius;
}

function colorLoop() {

    // cycle BG color
    let hsl = [0, 0.3, 0.2];
    setInterval(() => {
        hsl[0] += 0.25;
        hsl[0] = hsl[0] % 100;
        let [hue, sat, val] = hsl;
        var bg = hslToRgb(hue / 100, sat, val);
        // scene.clearColor = bg;
        scene.clearColor = new Color4(0,0,0,0);
        
    }, 150);
}

// snippet taken from
// https://gist.github.com/mjackson/5311256
//
function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r, g, b };
}
