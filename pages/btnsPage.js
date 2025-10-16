function setupRiveHoverAnimation(canvasId, src, stateMachine, inputName) {
    const canvas = document.getElementById(canvasId);

    const riveInstance = new rive.Rive({
    src,
    canvas,
    autoplay: true,
    stateMachines: stateMachine,
    fit: rive.Fit.CONTAIN,
    alignment: rive.Alignment.CENTER,
    onLoad: () => {
        riveInstance.resizeDrawingSurfaceToCanvas();
        const inputs = riveInstance.stateMachineInputs(stateMachine);
        const hoverInput = inputs.find(i => i.name === inputName);

        if (!hoverInput) {
            console.error(`Input "${inputName}" not found in "${stateMachine}"`);
        return;
        }

        canvas.addEventListener("mouseenter", () => {
            hoverInput.value = true;
            console.log("hover");
        });

        canvas.addEventListener("mouseleave", () => {
            hoverInput.value = false;
        });
    }
    });

    const resizeObserver = new ResizeObserver(() => {
    try { 
        riveInstance.resizeDrawingSurfaceToCanvas(); 
    } catch(e) {}
    });
    resizeObserver.observe(canvas);
}

// 👇 Setup multiple Rive animations easily
// setupRiveHoverAnimation("settings", "../assets/settings_one_gear.riv", "State Machine 1", "Boolean 1");
// setupRiveHoverAnimation("refresh", "../assets/refresh.riv", "State Machine 1", "hoverOn");
setupRiveHoverAnimation("back", "../assets/backHover.riv", "State Machine 1", "hoverOn");
