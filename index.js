function load() {
    //Avi Bar Bottom
    var allSpan = document.getElementById("all");
    var activeSpan = document.getElementById("active");
    var completedSpan = document.getElementById("completed");
    var clear = document.getElementById("clear");
    var activeCount = 0;
    var completedCount = 0;
    if (!localStorage.hasOwnProperty("type")) {
        localStorage.setItem("type", "all");
    }
    createElement(localStorage.getItem("type"));
    clickListener();
    var input = document.getElementById("inputContents");
    let widths = window.screen.width / 2 - 80;
    input.style.width = widths;
    input.focus(function () {
        input.style.borderStyle = "none";
    });
    input.addEventListener('keydown', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13 && input.value != "") {
            var data = loadData();
            var all = { "title": input.value, "done": false };
            data.push(all);
            saveData(data);
            createElement(localStorage.getItem("type"));
        }
    });



    //List
    function createElement(type) {
        document.getElementById("inputContents").value = "";
        let ulContent = document.getElementById("ulContent");
        ulContent.innerHTML = "";
        var collection = localStorage.getItem("all");
        if (collection != null) {
            var data = JSON.parse(collection);
            let allCount = 0;
            activeCount = 0;
            completedCount = 0;

            // alert("collection = " + collection.toString());

            switch (type) {
                case "all":
                    allSpan.style.border = "1px solid #FFD39B";
                    activeSpan.style.border = "none";
                    completedSpan.style.border = "none";
                    for (let i = 0; i < data.length; i++) {
                        listContent = document.createElement("div");
                        listContent.className = "listContent";
                        let checkboxContent = document.createElement("input");
                        checkboxContent.setAttribute("type", "checkbox");
                        checkboxContent.className = "checkboxContent";
                        checkboxContent.id = "checkboxContent";

                        // background
                        let label = document.createElement("label");
                        label.setAttribute("for", "checkboxContent");
                        label.className = "labelImg";

                        let spanContent = document.createElement("textarea");
                        spanContent.className = "spanContent";
                        spanContent.value = data[i].title;
                        spanContent.readOnly = true;
                        let widths = window.screen.width/2-80;
                        spanContent.style.width = widths;
                        spanContent.style.outline = "none";
                        spanContent.style.height = "auto";

                        let img = document.createElement("img");
                        img.className = "deleteImg";
                        img.setAttribute("src", "image/delete.png");
                        //监听删除事件
                        img.addEventListener("click", function () {
                            remove(i);
                        });
                        if (data[i].done == true) {
                            checkboxContent.checked = true;
                            label.style.backgroundImage = "url(image/selected_img.png)"
                            spanContent.style.textDecoration = "line-through";
                            spanContent.style.color = "gray";
                            completedCount++;
                            document.getElementById("clear").style.display = "block";
                        }
                        else {
                            checkboxContent.checked = false;
                            label.style.backgroundImage = "url(image/gray_circle.png)"
                            spanContent.style.textDecoration = "none";
                            spanContent.style.color = "black";
                            activeCount++;
                        }

                        //double-click
                        spanContent.addEventListener("dblclick", function () {
                            // alert("editContentReturn = " + editContent(spanContent, i));
                            spanContent.readOnly = false;
                            editContent(spanContent, i);
                        });

                        //selected checkbox
                        checkboxContent.addEventListener("change", function () {
                            checkboxChange(checkboxContent, spanContent, i, label);
                        });
                        listContent.appendChild(checkboxContent);
                        listContent.appendChild(spanContent);
                        listContent.appendChild(img);
                        //background
                        listContent.appendChild(label);

                        //move in
                        listContent.addEventListener("mouseover", function () {
                            img.style.display = "block";
                        });

                        //move off
                        listContent.addEventListener("mouseout", function () {
                            img.style.display = "none";
                        });

                        ulContent.appendChild(listContent);
                        allCount++;
                    }
                    if (activeCount == 0 || activeCount == 1) {
                        document.getElementById("labelSpan").innerText = "item left";
                    }
                    else {
                        document.getElementById("labelSpan").innerText = "items left";
                    }

                    $('.spanContent').each(function () {
                        setHeight(this);
                    }).on('input', function () {
                        setHeight(this);
                    });

                    break;

                case "active":
                    //AVI BAR
                    activeSpan.style.border = "1px solid #FFD39B";
                    allSpan.style.border = "none";
                    completedSpan.style.border = "none";

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].done == true) {
                            document.getElementById("clear").style.display = "block";
                        }
                        if (data[i].done == false) {
                            activeCount++;
                            listContent = document.createElement("div");
                            listContent.className = "listContent";
                            let checkboxContent = document.createElement("input");
                            checkboxContent.setAttribute("type", "checkbox");
                            checkboxContent.className = "checkboxContent";

                            // Background Image
                            let label = document.createElement("label");
                            label.setAttribute("for", "checkboxContent");
                            label.className = "labelImg";

                            let spanContent = document.createElement("textarea");
                            spanContent.className = "spanContent";
                            spanContent.value = data[i].title;
                            spanContent.readOnly = true;
                            let widths = window.screen.width / 2 - 80;
                            spanContent.style.width = widths;
                            spanContent.className = "spanContent";
                            spanContent.innerText = data[i].title;
                            spanContent.style.outline = "none";

                            let img = document.createElement("img");
                            img.className = "deleteImg";
                            img.setAttribute("src", "image/delete.png");
                            //Monitor Deleted
                            img.addEventListener("click", function () {
                                remove(i);
                            });
                            //Monitor Selected
                            checkboxContent.addEventListener("change", function () {
                                activeAndCompletedChange(checkboxContent, spanContent, i, "active", label);
                            });

                            //Monitor Mouse
                            spanContent.addEventListener("dblclick", function () {
                                spanContent.readOnly = false;
                                editContent(spanContent, i);
                            })

                            //Mouse Move In
                            listContent.addEventListener("mouseover", function () {
                                img.style.display = "block";
                            });

                            //Mouse Move Out
                            listContent.addEventListener("mouseout", function () {
                                img.style.display = "none";
                            });
                            listContent.appendChild(label);

                            listContent.appendChild(checkboxContent);
                            listContent.appendChild(spanContent);
                            listContent.appendChild(img);
                            ulContent.appendChild(listContent);
                        }
                    }
                    if (activeCount == 0 || activeCount == 1) {
                        document.getElementById("labelSpan").innerText = "item left";
                    }
                    else {
                        document.getElementById("labelSpan").innerText = "items left";
                    }

                    $('.spanContent').each(function () {
                        setHeight(this);
                    }).on('input', function () {
                        setHeight(this);
                    });
                    break;

                case "completed":

                    //底部导航栏
                    completedSpan.style.border = "1px solid #FFD39B";
                    allSpan.style.border = "none";
                    activeSpan.style.border = "none";

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].done == false) {
                            activeCount++;
                        }

                        if (data[i].done == true) {
                            document.getElementById("clear").style.display = "block";
                            completedCount++;
                            listContent = document.createElement("div");
                            listContent.className = "listContent";
                            let checkboxContent = document.createElement("input");
                            checkboxContent.setAttribute("type", "checkbox");
                            checkboxContent.className = "checkboxContent";

                            // 背景图片代替checkbox自身样式
                            let label = document.createElement("label");
                            label.setAttribute("for", "checkboxContent");
                            label.className = "labelImg";

                            let spanContent = document.createElement("textarea");
                            spanContent.className = "spanContent";
                            spanContent.value = data[i].title;
                            spanContent.readOnly = true;
                            let widths = window.screen.width / 2 - 80;
                            spanContent.style.width = widths;
                            spanContent.style.outline = "none";
                            let img = document.createElement("img");
                            img.className = "deleteImg";
                            img.setAttribute("src", "image/delete.png");
                            //监听删除事件
                            img.addEventListener("click", function () {
                                remove(i);
                            });
                            checkboxContent.checked = true;
                            label.style.backgroundImage = "url(image/selected_img.png)";
                            spanContent.style.textDecoration = "line-through";
                            spanContent.style.color = "gray";
                            //监听checkbox选中事件
                            checkboxContent.addEventListener("change", function () {
                                activeAndCompletedChange(checkboxContent, spanContent, i, "completed", label);
                            });

                            //double
                            spanContent.addEventListener("dblclick", function () {
                                spanContent.readOnly = false;
                                editContent(spanContent, i);
                            })

                            //move in
                            listContent.addEventListener("mouseover", function () {
                                img.style.display = "block";
                            });

                            //move off
                            listContent.addEventListener("mouseout", function () {
                                img.style.display = "none";
                            });

                            listContent.appendChild(label);

                            listContent.appendChild(checkboxContent);
                            listContent.appendChild(spanContent);
                            listContent.appendChild(img);
                            ulContent.appendChild(listContent);
                        }
                    }
                    if (activeCount == 0 || activeCount == 1) {
                        document.getElementById("labelSpan").innerText = "item left";
                    }
                    else {
                        document.getElementById("labelSpan").innerText = "items left";
                    }

                    $('.spanContent').each(function () {
                        setHeight(this);
                    }).on('input', function () {
                        setHeight(this);
                    });
                    break;
                default:
                    break;
            }
            document.getElementById("number").innerText = activeCount;
        }

    }

    // textarea height
    $('.spanContent').each(function () {
        setHeight(this);
    }).on('input', function () {
        setHeight(this);
    });

    //Update title
    function updateSpan(i, value) {
        let data = loadData();
        data[i].title = value;
        saveData(data);
    }
    //height of tetxtarea
    function setHeight(element) {
        $(element).css({ 'height': 'auto', 'overflow-y': 'hidden' }).height(element.scrollHeight);
    }

    //Save Data
    function saveData(data) {
        localStorage.setItem("all", JSON.stringify(data));
    }

    //Create
    function loadData() {
        var collection = localStorage.getItem("all");
        if (collection != null) {
            return JSON.parse(collection);
        }
        else return [];
    }

    //Delete
    function remove(i) {
        var data = loadData();
        var todo = data.splice(i, 1)[0];
        saveData(data);
        window.location.reload();
    }


//active and completed checkbox
    function activeAndCompletedChange(check, span, j, type, label) {
        if (check.checked) {
            label.style.backgroundImage = "url(image/selected_img.png)";
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
            //set done in data to be :true
            updata(j, true);
            activeCount--;
            completedCount++;
            document.getElementById("number").innerText = activeCount;
            createElement(type);
            document.getElementById("clear").style.display = "block";
            if (activeCount == 0 || activeCount == 1) {
                document.getElementById("labelSpan").innerText = "item left";
            }
            else {
                document.getElementById("labelSpan").innerText = " items left";
            }
        }
        else {
            label.style.backgroundImage = "url(image/gray_circle.png)";
            span.style.textDecoration = "none";
            span.style.color = "black";
            updata(j, false);
            activeCount++;
            completedCount--;
            document.getElementById("number").innerText = activeCount;
            createElement(type);
            if (completedCount == 0) {
                document.getElementById("clear").style.display = "none";
            }
            if (activeCount == 0 || activeCount == 1) {
                document.getElementById("labelSpan").innerText = "item left";
            }
            else {
                document.getElementById("labelSpan").innerText = " items left";
            }
        }
    }

    //Change Box
    function checkboxChange(check, span, j, label) {
        if (check.checked) {
            label.style.backgroundImage = "url(image/selected_img.png)";
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
            //将存储数据中的done设为true
            updata(j, true);
            activeCount--;
            completedCount++;
            document.getElementById("number").innerText = activeCount;
            //has completed task , show clear span
            document.getElementById("clear").style.display = "block";
            if (activeCount == 0 || activeCount == 1) {
                document.getElementById("labelSpan").innerText = "item left";
            }
            else {
                document.getElementById("labelSpan").innerText = "items left";
            }
        }
        else {
            label.style.backgroundImage = "url(image/gray_circle.png)";
            span.style.textDecoration = "none";
            span.style.color = "black";
            updata(j, false);
            activeCount++;
            completedCount--;
            document.getElementById("number").innerText = activeCount;
            if (completedCount == 0) {
                document.getElementById("clear").style.display = "none";
            }
            if (activeCount == 0 || activeCount == 1) {
                document.getElementById("labelSpan").innerText = "item left";
            }
            else {
                document.getElementById("labelSpan").innerText = "items left";
            }
        }
    }



    //update
    function updata(j, flag) {
        var data = loadData();
        data[j].done = flag;
        saveData(data);
    }

    //click
    function clickListener() {
        allSpan.addEventListener("click", function () {
            allSpan.style.border = "1px solid #FFD39B";
            activeSpan.style.border = "none";
            completedSpan.style.border = "none";
            localStorage.setItem("type", "all");
            createElement(localStorage.getItem("type"));
        });
        activeSpan.addEventListener("click", function () {
            allSpan.style.border = "none";
            activeSpan.style.border = "1px solid #FFD39B";
            completedSpan.style.border = "none";
            localStorage.setItem("type", "active");
            createElement(localStorage.getItem("type"));
        });

        completedSpan.addEventListener("click", function () {
            allSpan.style.border = "none";
            activeSpan.style.border = "none";
            completedSpan.style.border = "1px solid #FFD39B";
            localStorage.setItem("type", "completed");
            createElement(localStorage.getItem("type"));
        });

        clear.addEventListener("click", function () {
            deleteComplete();
        });

        //select all items
        let img = document.getElementById("image");
        img.addEventListener("change", function () {
            let data = loadData();
            if (activeCount == 0) {
                img.checked = false;
            }
            else {
                img.checked = true;
            }
            if (data.length > 0) {
                if (img.checked) {
                    for (let i = data.length - 1; i >= 0; i--) {
                        data[i].done = true;
                    }
                    saveData(data);
                    createElement(localStorage.getItem("type"));
                    document.getElementById("clear").style.display = "block";
                    document.getElementById("labelSpan").innerText = "item left";
                }
                else {
                    for (let i = data.length - 1; i >= 0; i--) {
                        data[i].done = false;
                    }
                    saveData(data);
                    createElement(localStorage.getItem("type"));
                    document.getElementById("clear").style.display = "none";
                    document.getElementById("labelSpan").innerText = "items left";
                }
            }
        });
    }

    function editContent(spanContent, i) {
        spanContent.style.outline = "#949494 solid 1px"
        let title = spanContent.value;
        spanContent.setSelectionRange(0, spanContent.value.length);
        spanContent.focus();
        spanContent.onblur = function () {
            if (spanContent.value.length == 0) {
                let data = loadData();
                let todo = data.splice(i, 1)[0];
                saveData(data);
                window.location.reload();
            }
            else {
                updateSpan(i, spanContent.value);
                spanContent.readOnly = true;
                spanContent.style.outline = "none";
            }
        }


    }

    //delete completed tasks
    function deleteComplete() {
        let deleteData = loadData();
        for (let i = deleteData.length - 1; i >= 0; i--) {
            if (deleteData[i].done == true) {
                deleteData.splice(i, 1)[0];
            }
        }
        saveData(deleteData);
        window.location.reload();
    }

    spanContent.addEventListener('keydown', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            if (spanContent.value.length == 0) {
                let data = loadData();
                let todo = data.splice(i, 1)[0];
                saveData(data);
                window.location.reload();
            }
            else {
                updateSpan(i, spanContent.value);
                spanContent.readOnly = true;
                spanContent.style.outline = "none";
            }
        }
    });



}