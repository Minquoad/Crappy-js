
    function appendCriterionCreationForm(data) {
        criteriaAdditionDiv.empty();
        criteriaAdditionDiv.append(data);

        let form = $("#criterionCreationForm");
        let submitButton = $("#criterionCreationFormSubmitButton");

        submitButton.on("click", function () {
            form.submit();
        });

        form.on('submit', function (e) {
            e.preventDefault();

            criteriaAdditionDiv.empty();
            criteriaAdditionDiv.html("<div id='criteriaAdditionFormLoading' class='center'><img src='/shareplace/img/global/loader.gif'/></div>");

            $.ajax({
                url: form.attr('action'),
                type: "POST",
                data: form.serialize(),
                success: function (data) {
                    if (data === true) {
                        partSelect.val("");
                        partSelect.trigger("change");

                        criteriaViewer.append('<option class="loadingOption"></option>');
                        updateCriteriaViewer();
                    } else {
                        appendCriterionCreationForm(data);
                    }
                }
            });
        });
    }

    fieldSelect.on("change", function () {

        criteriaAdditionDiv.hide();

        let selectedField = fieldSelect.val();
        if (selectedField !== null && selectedField !== "") {

            criteriaAdditionDiv.empty();
            criteriaAdditionDiv.html("<div id='criteriaAdditionFormLoading' class='center'><img src='/shareplace/img/global/loader.gif'/></div>");
            criteriaAdditionDiv.show();

            let selectedPart = partSelect.val();

            let url = criteriaAdditionDiv.attr("data-criterionAdditionFormUrl");
            url = url.replace("{partKey}", selectedPart);
            url = url.replace("{fieldKey}", selectedField);

            $.ajax({
                type: 'GET',
                url: url,
                dataType: "html",
                success: function (data) {
                    appendCriterionCreationForm(data);
                }
            }).fail(function () {
                criteriaAdditionDiv.empty();
                criteriaAdditionDiv.html("<div class='criterionCreationErrorMessage'>The server encountered a problem.</div>");
            });
        }
    });
