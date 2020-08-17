$(document).ready(function () {

    $(".influencedElement").each(function () {
        let influencedElement = $(this);

        let influencerName = influencedElement.attr("data-influencerName");
        let influencerRequiredValues = influencedElement.attr("data-influencerRequiredValues").split(",");

        let influencers = $("[name='" + influencerName + "'], [name='" + influencerName + "[]']");

        influencers.each(function () {
            let influencer = $(this);

            let influencerType = influencer.attr("type");
            influencer.on("change", function () {

                let visible = false;

                if (influencerType === "checkbox" || influencerType === "radio") {
                    let checkedValues = [];
                    influencers.each(function () {
                        let checkbox = $(this);
                        if (checkbox.is(":checked")) {
                            checkedValues.push(checkbox.val());
                        }
                    });

                    for (let checkedValue of checkedValues) {
                        if (influencerRequiredValues.includes(checkedValue)) {
                            visible = true;
                            break;
                        }
                    }

                } else {
                    visible = influencerRequiredValues.includes(influencer.val());
                }

                if (visible) {
                    let input = influencedElement.closest(".input");
                    if (input.length !== 0) {// if it is a form element
                        input.show();
                        influencedElement.closest(".control-group").slideDown();
                    } else {
                        influencedElement.slideDown();
                    }

                } else {
                    let influencedElementType = influencedElement.attr("type");
                    if (influencedElementType === "checkbox" || influencedElementType === "radio") {
                        influencedElement.removeAttr("checked");
                    } else {
                        influencedElement.val("");
                    }
                    influencedElement.trigger("change");

                    let input = influencedElement.closest(".input");
                    if (input.length !== 0) {// if it is a form element
                        input.hide();
                        influencedElement.closest(".control-group").slideUp();
                    } else {
                        influencedElement.slideUp();
                    }
                }

            });

            if (influencerType === "checkbox" || influencerType === "radio") {
                if (influencer.is(":checked")) {
                    influencer.trigger("change");
                }
            } else {
                influencer.trigger("change");
            }
        });
    });

});
