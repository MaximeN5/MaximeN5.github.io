      var modal = document.getElementById('mylistFiller');

        var btn = document.getElementById("myBtn");

        var volunteer = document.getElementById("Volunteer");

        var span = document.getElementsByClassName("close")[0];

        btn.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        volunteer.onkeypress =function(event){
            if (event.which == 13 && document.getElementById("Volunteer").value!="") {
                let vol = volunteer.value;
                document.getElementById("result").innerHTML = vol;
                AlreadyUsed.push(vol);
                var index = nameList.indexOf(vol);   
                if (index !== -1) {
                    nameList.splice(index, 1);
                }
                fileDisplayArea.innerHTML = nameList;
                fillList();
                document.getElementById("Volunteer").value="";
            }
        }

        
        var nameList = [
                'Pierre Henri',
                'Jean-Jaques',
                'Marie Helene',
                'joe dimagio'
                ]

        var AlreadyUsed = [
                ]  
                
        var fillList = function(){
            document.getElementById("part").innerHTML='';
            nameList.forEach(function(item){
            var o = document.createElement("option");
            o.innerText = item;
            document.getElementById("part").append(o);
        });
    };
            
       var randomSelect = function(){
            if(nameList.length==0){
                nameList = AlreadyUsed;
                AlreadyUsed = [];
                document.getElementById("result").innerHTML = "On recommence";
                fileDisplayArea.innerHTML = nameList;
                fillList();
                return;
            }
            let random = Math.floor(Math.random() * nameList.length);
            document.getElementById("result").innerHTML = nameList[random];
            AlreadyUsed.push(nameList[random]);
            nameList.splice(random,1);
            fileDisplayArea.innerHTML = nameList
            fillList();
        }

        window.onload = function() {
            fillList();
            var fileInput = document.getElementById('fileInput');
            var fileDisplayArea = document.getElementById('fileDisplayArea');
            var datalist = document.getElementById('');
            fileDisplayArea.innerHTML = nameList

            fileInput.addEventListener('change', function(e) {
                var file = fileInput.files[0];
                var textType = /text.*/;
                        if (file.type.match(textType)) {
                            var reader = new FileReader();

                            reader.onload = function(e) {
                                var words = reader.result.replace(/^\s*[\r\n]/gm, '\n').split(/[\n\,\.]+/);
                                nameList = words;
                                console.log(nameList);
                                AlreadyUsed = [];
                                fileDisplayArea.innerText = nameList;
                                fillList()
                            }

                            reader.readAsText(file);  
                        } else {
                            fileDisplayArea.innerText = "File not supported!";
            }
        });  
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }