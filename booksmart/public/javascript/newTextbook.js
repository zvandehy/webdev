var croppieOptions = {
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

var count = 0;

$(function () {
    var $uploadCrop = $('#upload-demo').croppie(croppieOptions);
    $("#upload").on("change", function () {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                }).then(function () {
                    // TODO: make sure crop is high quality
                    $('.cr-slider').attr({ 'min': 0.05, 'max': 0.5000 })
                });
                $('.upload-demo').addClass('ready');
            };
            reader.readAsDataURL(input.files[0]);
        }
    });
    // Cite: https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
    function dataURItoBlob(dataurl) {
        console.group("Blob");
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        console.log(arr);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        console.log(u8arr);
        console.groupEnd();
        return new Blob([u8arr], { type: mime });
    }

    $('.upload-result').on('click', function (ev) {
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {
            $("#extra-images-wrap a").each(function () {
                $(this).removeClass("focused");
            });
            $('#extra-images-wrap').append(`<a class="focused" href="${resp}"><img src="${resp}"></a>`);
            // make sure that the image gets appended to the form
            var blob = dataURItoBlob(resp);
            console.log(blob);

            // TODO: multiple images name
            // $('#hidden-images').append(`<input type="hidden" id="image${count}" name="image${count}">`);
            // console.group("Embedded Image");
            // console.log($(`#image${count}`));
            // $(`#image${count}`).val(blob); //"[object Blob]"
            // console.log($(`#image${count}`));
            // console.log($(`#image${count}`).val());
            // console.groupEnd();
            // count++;
            readyImages();
        });
    });

    $('#quality').selectize({
        persist: false,
        create: true,
        createOnBlur: true,
        highlight: true,
        openOnFocus: true,
        maxItems: 1,
        allowEmptyOption: false,
        create: function (input) {
            return {
                value: input,
                text: input
            }
        }
    })

    $('#subject').selectize({
        persist: false,
        create: true,
        createOnBlur: true,
        highlight: true,
        openOnFocus: true,
        maxItems: 1,
        allowEmptyOption: false,
        create: function (input) {
            return {
                value: input,
                text: input
            }
        }
    })
});



// $(document).ready(function () {
//     $("#textbook-form").on('submit', function (e) {
//         e.preventDefault();
//         // alert($(this).attr('action'));
//         let href = $(this).attr('action');
//         let method = "PUT";
//         if (href == "/textbooks") {
//             method = "POST";
//         }
//         // var container = $('#hidden-images');
//         // if (container.children("input").length > 0) {
//         //     for (img of container.children("input")) {
//         //         console.group("child: ");
//         //         console.log(img);
//         //         console.log(img.value);
//         //         console.groupEnd()
//         //     }
//         var form_data = $(this).serializeArray();
//         form_data.push({ name: "images", value: $("#imageurl").val() });
//         form_data = jQuery.param(form_data);
//         // TODO: this is sending many PUT requests when updating
//         $.ajax({
//             url: href,
//             type: method,
//             data: form_data
//         })
//             .done(function (data) {
//                 location.href = href;
//             })
//             .fail(function (data) { //TODO: Why does this fail on PUT?
//                 location.href = href; 
//             })

//         // } else {
//         //     alert("Please upload and crop a photo of your textbook.");
//         // }
//     });
// })


// function validate() {
//     var container = $('#extra-images-wrap');
//     if (container.children("a").length > 0) {

//         console.log(container);
//         // Cite:https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
//         var formElement = document.querySelector("#textbook-form");
//         var fd = new FormData(formElement);
//         fd.append("serialNumber", 5);

//         console.log("'#textbook-form':");
//         console.log(formElement);

//         var request = new XMLHttpRequest();
//         request.open("POST", "/textbooks");

//         console.log(...fd);
//         for (img of container.children("a")) {
//             console.log("child: " + img);
//         }
//         alert(...fd);
//         request.send(fd);

//         // false if shouldn't send request via the form
//         return false;
//     }
//     alert("Please upload and crop a photo of your textbook");
//     return false;
// }

function removePhoto() {
    $("#extra-images-wrap a.focused").remove();
    // TODO: Remove from hidden images input
}