(function () {

    var form = document.querySelector('#instructions'),
        input = form.querySelector('input'),
        robot = new Robot();

    form.addEventListener('submit', function formSubmit(event) {
        event.preventDefault();
        robot = robot || new Robot();
        robot.command(input.value);
        if (robot.lost) {
            robot = null;
        }
        input.value = '';
    });


}());
