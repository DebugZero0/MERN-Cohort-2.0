const circles = document.querySelectorAll(".big");

    circles.forEach((big, index) => {
        const small = big.querySelector(".small");

        const bigRadius = 15;
        const smallRadius = 2;

        let targetX = bigRadius - smallRadius;
        let targetY = bigRadius - smallRadius;

        let currentX = targetX;
        let currentY = targetY;

        document.addEventListener("pointermove", (e) => {
            const rect = big.getBoundingClientRect();
            const centerX = rect.left + bigRadius;
            const centerY = rect.top + bigRadius;

            let dx = e.clientX - centerX;
            let dy = e.clientY - centerY;

            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = bigRadius - smallRadius;

            if (dist > maxDist) {
                dx = (dx / dist) * maxDist;
                dy = (dy / dist) * maxDist;
            }

            targetX = dx + bigRadius - smallRadius;
            targetY = dy + bigRadius - smallRadius;
        });

        function animate() {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            small.style.left = currentX + "vmin"; 
            small.style.top = currentY + "vmin";

            requestAnimationFrame(animate);
        }

        animate();
    });