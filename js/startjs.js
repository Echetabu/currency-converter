function menupop (){
				
				document.getElementById("menu").classList.toggle("show");
				
				}
				
				windowonclick = function(event){
				
				if(!event.target.matches('.men'))
				
				{
				
				var dropdowns  = 
				
				document.getElementsByClassName("menucon");
				
				var i;
				
				for(i=0; i<dropdowns.length; i++)
				
				{
				
				var openme = dropdowns[i];
				
				if (openme.classList.contains('show')){
				
				openme.classList.remove('show');
				
				}
				
				}
				
				}
				
				}
