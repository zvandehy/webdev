var croppleOptions = {
    showZoomer: true,
    enableOrientation: true,
    mouseWheelZoom: "ctrl",
    viewport: {
        width: 350,
        height: 350,
        type: "square"
    },
    boundary: {
        width: "50vw",
        height: "50vh"
    }
}
$(function () {
    var $uploadCrop = $('#upload-demo').croppie(croppleOptions)
    $("#upload").on("change", function () {
        var input = this
        if (input.files && input.files[0]) {
            var reader = new FileReader()
            reader.onload = function (e) {
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                }).then(function () {
                    $('.cr-slider').attr({ 'min': 0.05, 'max': 0.5000 })
                })
                $('.upload-demo').addClass('ready')
            }
            reader.readAsDataURL(input.files[0])
        }
    })
    $('.upload-result').on('click', function (ev) {
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {
            $("#extra-images-wrap a").each(function () {
                $(this).removeClass("focused");
            });
            $('#extra-images-wrap').append(`<a class="focused" href="${resp}"><img src="${resp}"></a>`);
            readyImages();
        });
    });
});