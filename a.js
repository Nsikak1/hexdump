function format(arrBuffer) {
    let screen = [], line = [], address = 0;
    for (let i = 0; i < lines / 2; i++) {
        address += 10;
        address.toString(16).padStart(8, 0);
    }

}