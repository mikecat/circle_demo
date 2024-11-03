"use strict";

window.addEventListener("DOMContentLoaded", () => {
	const elems = {};
	document.querySelectorAll("[id]").forEach((elem) => elems[elem.id] = elem);

	const render = () => {
		elems.invalidShowArea.style.display = "";
		const diameter = parseInt(elems.diameterArea.value, 10);
		const yohaku = parseInt(elems.yohakuArea.value, 10);
		const masuSize = parseInt(elems.masuSizeArea.value, 10);
		const pointRadius = parseInt(elems.pointRadiusArea.value, 10);
		if (
			isNaN(diameter) || diameter <= 0 ||
			isNaN(yohaku) || yohaku < 0 || // 余白は0でもOK
			isNaN(masuSize) || masuSize <= 0 ||
			isNaN(pointRadius) || pointRadius <= 0
		) return;
		const backColor = elems.backColorArea.value;
		const lineColor = elems.lineColorArea.value;
		const circleColor = elems.circleColorArea.value;
		const colorPuttern = /^#[0-9a-f]{6}$/i;
		if (
			!colorPuttern.test(backColor) ||
			!colorPuttern.test(lineColor) ||
			!colorPuttern.test(circleColor)
		) return;
		const useHalf = elems.useHalfArea.checked;
		elems.invalidShowArea.style.display = "none";
		const canvasSize = masuSize * diameter + yohaku * 2;
		elems.thecanvas.width = canvasSize;
		elems.thecanvas.height = canvasSize;
		const ctx = elems.thecanvas.getContext("2d");
		ctx.fillStyle = backColor;
		ctx.fillRect(0, 0, canvasSize, canvasSize);
		ctx.fillStyle = circleColor;
		ctx.strokeStyle = circleColor;
		for (let i = 0; i < diameter; i++) {
			for (let j = 0; j < diameter; j++) {
				const x = i + (elems.useCenter.checked ? 0.5 : 0) - (diameter / 2);
				const y = j + (elems.useCenter.checked ? 0.5 : 0) - (diameter / 2);
				if (x * x + y * y <= (diameter / 2) * (diameter / 2)) {
					ctx.fillRect(
						yohaku + masuSize * j,
						yohaku + masuSize * i,
						masuSize, masuSize
					);
				}
			}
		}
		ctx.strokeStyle = lineColor;
		if (elems.drawGrid.checked) {
			for (let i = 0; i <= diameter; i++) {
				ctx.beginPath();
				ctx.moveTo(yohaku + masuSize * i + (useHalf ? 0.5 : 0), yohaku + (useHalf ? 0.5 : 0));
				ctx.lineTo(yohaku + masuSize * i + (useHalf ? 0.5 : 0), yohaku + masuSize * diameter + (useHalf ? 0.5 : 0));
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(yohaku + (useHalf ? 0.5 : 0), yohaku + masuSize * i + (useHalf ? 0.5 : 0));
				ctx.lineTo(yohaku + masuSize * diameter + (useHalf ? 0.5 : 0), yohaku + masuSize * i + (useHalf ? 0.5 : 0));
				ctx.stroke();
			}
		}
		ctx.fillStyle = lineColor;
		if (elems.drawPoints.checked) {
			for (let i = 0; i < diameter; i++) {
				for (let j = 0; j < diameter; j++) {
					ctx.beginPath();
					ctx.arc(
						yohaku + masuSize * (j + (useCenter.checked ? 0.5 : 0)) + (useHalf ? 0.5 : 0),
						yohaku + masuSize * (i + (useCenter.checked ? 0.5 : 0)) + (useHalf ? 0.5 : 0),
						pointRadius, 0, Math.PI * 2
					);
					ctx.fill();
				}
			}
		}
		if (elems.drawCircle.checked) {
			ctx.beginPath();
			ctx.arc(
				yohaku + masuSize * (diameter / 2) + (useHalf ? 0.5 : 0),
				yohaku + masuSize * (diameter / 2) + (useHalf ? 0.5 : 0),
				masuSize * (diameter / 2), 0, Math.PI * 2
			);
			ctx.stroke();
		}
	};

	elems.diameterArea.addEventListener("change", render);
	elems.yohakuArea.addEventListener("change", render);
	elems.masuSizeArea.addEventListener("change", render);
	elems.pointRadiusArea.addEventListener("change", render);

	elems.useCenter.addEventListener("change", render);
	elems.drawGrid.addEventListener("change", render);
	elems.drawPoints.addEventListener("change", render);
	elems.drawCircle.addEventListener("change", render);
	elems.useHalfArea.addEventListener("change", render);

	elems.backColorArea.addEventListener("change", render);
	elems.lineColorArea.addEventListener("change", render);
	elems.circleColorArea.addEventListener("change", render);

	render();
});
