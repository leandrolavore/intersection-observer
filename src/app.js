export class App {
  message = 'Intersection-Observer';

  constructor(){
    this.people = [];
    this.target;
  }

  attached(){
    this.callMore()
  }

  setIntersection(){
    var that = this;

    var options = {
      root: document.querySelector('.rootUl'),
      rootMargin: '0px',
      threshold: 0.0
    }
    var intercepted = function(entries, observer){
      entries.forEach(entry => {
        entry.target.classList.contains('last') && entry.isIntersecting ? that.callMore() : null
      });
    }
    this.observer = new IntersectionObserver(intercepted, options);
    this.target = document.querySelector('.last');
    this.observer.observe(this.target);
  }

  callMore() {
    fetch('https://swapi.co/api/people')
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        return data.results
      })
      .then(function(results){
        var newArray = [...this.people,...results];
        this.people = newArray;
        console.log(newArray)
        return
      }.bind(this))
  }

  seePeople(){
    console.log(this.people);
  }
}
