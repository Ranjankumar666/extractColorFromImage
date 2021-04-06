async function copyToClipboard(text) {
    try {
        const { state } = await navigator.permissions.query({
            name: "clipboard-write",
        });

        if (state === "granted" || state === "prompt") {
            navigator.clipboard.writeText(text).then(() => {
                alert("Copied");
            });
        }
    } catch (err) {
        const ipt = document.createElement("input");
        ipt.value = text;
        ipt.select();
        document.execCommand("copy");
        alert("copied");
    }
}

function rgbToHex(rgb) {
    const radix = 16;
    const hex = Array.from({ length: radix }, (v, i) => {
        switch (i) {
            case 10:
                return "a   ";
            case 11:
                return "b";
            case 12:
                return "c";
            case 13:
                return "d";
            case 14:
                return "e";
            case 15:
                return "f";
            default:
                return String(i);
        }
    });

    const rgbValues = rgb.slice(4, -1).split(",");
    const res = [];

    for (let value of rgbValues) {
        val = parseInt(value);

        while (val > 0) {
            const remainder = val % radix;

            res.push(hex[remainder]);
            val = Math.floor(val / radix);
        }
    }

    // return res;
    return `#${res.join("")}`;
}
