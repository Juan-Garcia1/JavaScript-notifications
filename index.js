const ul = document.querySelector('#albums');
const save_btn = document.querySelector('#save');

// number of albums added to download
let albums_added = [];

const albums = [
  {
    name: 'Hardwired... to Self-Destruct',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Metallica_Hardwired..._To_Self-Destruct_2016.jpeg/220px-Metallica_Hardwired..._To_Self-Destruct_2016.jpeg',
    band: 'Metallica'
  },
  {
    name: 'Reload',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Metallica_-_Reload_cover.jpg/220px-Metallica_-_Reload_cover.jpg',
    band: 'Metallica'
  },
  {
    name: 'Death Magnetic',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Metallica_-_Death_Magnetic_cover.jpg/220px-Metallica_-_Death_Magnetic_cover.jpg',
    band: 'Metallica'
  },
  {
    name: 'St. Anger',
    cover: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Metallica_-_St._Anger_cover.jpg/220px-Metallica_-_St._Anger_cover.jpg',
    band: 'Metallica'
  }
];

// shorten album name if too long
const text_truncate = function(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = '...';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

// Notification bar
const notification_bar = (function(string, cover, title) {
  notification.innerHTML = `<h4>${string}</h4>
                            <div class="added">
                              <img src="${cover}" />
                              <p>${title}</p>
                            </div>`
  notification.classList.add('notify');

  // hide notification after 2 seconds
  setTimeout(function() {
    notification.classList.remove('notify');
  }, 2000);
});

// save button notification
const saveBtn_notification = function(string, count) {
  notification.innerHTML = `
    <h4>${string}</h4>
    <p>
    ${count > 1 ? `${count} albums downloaded`:
     `${count <= 0 ? '' : `${count} album downloaded`} `}
    </p>`;

  notification.classList.add('notify');

  // hide notification after 2 seconds
  setTimeout(function() {
    notification.classList.remove('notify');
  }, 2000);
}

albums.map(function(album) {

  const li = document.createElement('li');

  li.innerHTML = `
  <figure>
    <img src="${album.cover}" alt="${album.name}" />
    <figcaption>
      <h3>${text_truncate(album.name, 25, '..')}</h3>
      <p>${album.band}</p>
    </figcaption>
  </figure>`;
  ul.append(li);
});

const figure = document.querySelectorAll('figure');
const notification = document.querySelector('.notification');


for(var i = 0; i < figure.length; i++) {

  figure[i].addEventListener('click', function() {
    const selected_album = this.parentNode.getElementsByTagName('figure')[0];
    selected_album.classList.toggle('selected');
    // console.log(selected_album);

    // album cover
    const album_cover = this.getElementsByTagName('img')[0].src;
    // album title
    const album_name = this.getElementsByTagName('h3')[0].textContent;

    // check if album was selected
    if(!selected_album.classList.contains('selected')) {
      // remove album fron array
      albums_added = albums_added.filter(function(item) {
        return item !== album_name;
      });
      notification_bar('Removed from Downloads', album_cover, album_name);

    } else {
      // notify user that the album was added
      notification_bar('Added to Downloads', album_cover, album_name);
      // add album to array
      albums_added.push(album_name);
    }
    // console.log(albums_added);


  });

}

save_btn.addEventListener('click', function() {
let count = albums_added.length;
  // if no albums where added
  if(!albums_added.length) {
    // notify user no albums where added
    saveBtn_notification('No albums Added', count);
  } else {
    // notify user how many albums where downloaded
    saveBtn_notification('Download Complete', count);
  }
});
