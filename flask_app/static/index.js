const colors = document.querySelectorAll(".color");

let color_rgb = [];

if (colors) {
    for (let color of colors) {
        const text = color.getAttribute("data-color");
        color.addEventListener("click", () => {
            copyToClipboard(text);
        });

        color_rgb.push(text);
    }
}

console.log(color_rgb);

const getCss = document.querySelector("#get_css");
getCss.addEventListener("click", () => {
    const css = `
        {
            --one: ${color_rgb[0]},
            --two: ${color_rgb[1]},
            --three: ${color_rgb[2]},
            --four: ${color_rgb[3]},
            --five: ${color_rgb[4]}

            //hex values
            --one-hex: ${rgbToHex(color_rgb[0])},
            --two-hex: ${rgbToHex(color_rgb[1])},
            --three-hex: ${rgbToHex(color_rgb[2])},
            --four-hex: ${rgbToHex(color_rgb[3])},
            --five-hex: ${rgbToHex(color_rgb[4])}
        }
    `;

    console.log(css);

    copyToClipboard(css);
});
