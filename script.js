var currentlyPlaying = document.querySelector('#currently-playing');

currentlyPlaying.addEventListener('mouseover', function(){
  currentlyPlaying.innerHTML = "<br /> Currently Playing: <i>'Queen in the North'</i>";
}
);

currentlyPlaying.addEventListener('mouseout', function(){
  currentlyPlaying.innerHTML = " ";
}
);
