// Static comments
// modified version of: https://github.com/travisdowns/travisdowns.github.io/blob/master/assets/main.js
var addComment = function () {

    var select = function (s) {
        return document.querySelector(s);
    };

    var I = function (id) {
        return document.getElementById(id);
    };

    var submitButton = select(".submit-form");

    var form = select(".form");
    form.doReset = function () {
        submitButton.innerHTML = "Submit";
        this.classList.remove("disabled");
        this.disabled = false;
    };

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        submitButton.innerHTML = "Posting...";
        submitButton.classList.add("disabled");
        submitButton.disabled = true;

        var errorHandler = function (title, err) {
            console.log(err);
            var ecode = err.errorCode || "unknown";
            showModal(title, "An error occured.<br>[" + ecode + "]");
            form.doReset();
        }

        fetch(this.getAttribute("action"), {
            method: "POST",
            body: new URLSearchParams(new FormData(this)),
            headers: new Headers({ "content-type": "application/x-www-form-urlencoded" })
        }).then(
            function (data) {
                if (data.ok) {
                    showModal(
                        "Comment submitted!",
                        "Thanks for your comment! It will be published after it's been approved by the Genics Blog team :)"
                    );
                } else {
                    data.json().then(function (err) {
                        errorHandler("Server Error", err);
                    });
                }
            }
        ).catch(function (err) {
            console.error(err);
            errorHandler("Unexpected Error", err);
        });

    });

    function showModal(title, message) {
        I("modal").classList.remove("hidden");

        document.getElementById("modal-title").textContent = title;
        document.getElementById("modal-message").textContent = message;

        select("#close").addEventListener("click", function () {
            I("modal").classList.add("hidden");

            submitButton.innerHTML = "Submit";
            submitButton.classList.remove("disabled");
            submitButton.disabled = false;

            form.reset();
            form.doReset();
        });
    }

    // Staticman comment replies, from https://github.com/mmistakes/made-mistakes-jekyll
    // modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
    // Released under the GNU General Public License - https://wordpress.org/about/gpl/
    // addComment.moveForm is called from comment.html when the reply link is clicked.

    return {

        // commId - the id attribute of the comment replied to (e.g., "comment-10")
        // respondId - the string "respond", I guess
        // parentId - the UID of the parent comment
        moveForm: function (commId, respondId, parentId) {
            var t = this;
            var comm = I(commId);                                // whole comment
            var respond = I(respondId);                             // whole new comment form
            var cancel = I("cancel-reply-btn");           // whole reply cancel link
            var parentIdF = I("replying-to-id");             // a hidden element in the comment

            if (!comm || !respond || !cancel || !parentIdF) {
                return;
            }

            t.respondId = respondId;

            if (!I("sm-temp-form-div")) {
                var div = document.createElement("div");
                div.id = "sm-temp-form-div";
                div.style.display = "none";
                respond.parentNode.insertBefore(div, respond); // create and insert a bookmark div right before comment form
            }

            comm.parentNode.insertBefore(respond, comm.nextSibling);  // move the form from the bottom to above the next sibling
            parentIdF.value = parentId;
            I("form-parent").classList.add("ml-14");
            I("form-title").innerHTML = "Add a reply";
            cancel.classList.remove("hidden");                     // make the cancel link visible

            cancel.onclick = function () {
                var temp = I("sm-temp-form-div");            // temp is the original bookmark
                var respond = I(t.respondId);                   // respond is the comment form

                if (!temp || !respond) {
                    return;
                }

                I("form-parent").classList.remove("ml-14");
                I("form-title").innerHTML = "Add a comment";
                I("replying-to-id").value = null;
                temp.parentNode.insertBefore(respond, temp);  // move the comment form to its original location
                temp.parentNode.removeChild(temp);            // remove the bookmark div
                this.classList.add("hidden");                 // make the cancel link invisible
                this.onclick = null;                          // retire the onclick handler
                return false;
            };

            I("commentbox-name").focus();

            return false;
        }
    }
}();