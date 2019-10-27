const running_button = document.getElementById('running-button');
const OFFSET = 100;

running_button.addEventListener('click', () => {
    alert('Nice try');
    window.close();
});

document.addEventListener('mousemove', (e) => {
    const x = e.pageX;
    const y = e.pageY;

    let buttonBox = running_button.getBoundingClientRect();
    console.log(distance_from_center(buttonBox.x, x, buttonBox.width));

    const h_dist_from = distance_from_center(buttonBox.x, x, buttonBox.width);
    const v_dist_from = distance_from_center(buttonBox.y, y, buttonBox.width);

    const h_offset = buttonBox.width / 2 + OFFSET;
    const v_offset = buttonBox.height / 2 + OFFSET;

    if(Math.abs(h_dist_from) <= h_offset &&
       Math.abs(v_dist_from) <= v_offset) {
            set_button_position(
                buttonBox.x + h_offset / h_dist_from * 10,
                buttonBox.y + v_offset / v_dist_from * 10
            );
    }
});

function set_button_position(left, top){
    const windowBox = document.body.getBoundingClientRect();
    let buttonBox = running_button.getBoundingClientRect();

    if(distance_from_center(left, windowBox.left, buttonBox.width) < 0) {
        left = windowBox.right - buttonBox.width - OFFSET;
    }

    if(distance_from_center(left, windowBox.right, buttonBox.width) > 0) {
        left = windowBox.left + OFFSET;
    }
    
    if(distance_from_center(top, windowBox.top, buttonBox.height) < 0) {
        top = windowBox.bottom - buttonBox.height - OFFSET;;
    }
    
    if(distance_from_center(top, windowBox.bottom, buttonBox.height) > 0) {
        top = windowBox.top + OFFSET;
    }
    
    running_button.style.left = `${left}px`
    running_button.style.top = `${top}px`
};

function distance_from_center(boxPosition, mousePosition, boxSize){
    return boxPosition - mousePosition + boxSize / 2;
};
