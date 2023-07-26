const editIcons = document.querySelectorAll('.edit-icon');
            
                editIcons.forEach(icon => {
                    icon.addEventListener('click', () => {
                      
                        alert('Edit data here');
                    });
                });
                function chooseFromComputer() {
                    document.getElementById('profilePicture').click();
                }
            
                function chooseFromURL() {
                    var imageURL = prompt('Please enter the URL of the image:');
                    if (imageURL) {
                        var profileImage = document.getElementById('profileImage');
                        profileImage.src = imageURL;
                    }
                }
            
                // Function to handle when an image is selected from the computer
                document.getElementById('profilePicture').addEventListener('change', function(event) {
                    var file = event.target.files[0];
                    var reader = new FileReader();
                    
                    reader.onload = function(e) {
                        var profileImage = document.getElementById('profileImage');
                        profileImage.src = e.target.result;
                    };
                    
                    reader.readAsDataURL(file);
                });             