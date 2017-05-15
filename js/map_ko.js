/**
 * Structure for locations
 * @param {json} data - json structure containing title and isDone
 **/
function Location(data) {
    this.title = ko.observable(data.title);
    this.isDone = ko.observable(data.isDone);
}

/** Knockout Locations View Model **/
function LocationsViewModel() {
    const self = this;
    self.tasks = ko.observableArray([]);
    self.newLocationText = ko.observable();
    self.incompleteLocations = ko.computed(function() {
        return ko.utils.arrayFilter(self.tasks(), function(task) {
          return !task.isDone() && !task._destroy;
        });
    });

    // Operations
    self.addLocation = function() {
        self.tasks.push(new Location({title: this.newLocationText()}));
        self.newLocationText('');
    };
    self.removeLocation = function(task) {
      self.tasks.destroy(task);
    };

    // Load initial state from server
    $.getJSON('/tasks', function(allData) {
        const mappedLocations = $.map(allData, function(item) {
          return new Location(item);
        });
        self.tasks(mappedLocations);
    })
    .fail(function() {
      console.log('error');
    })
    .always(function() {
      console.log('complete');
    });

    self.save = function() {
        $.ajax('/tasks/save', {
            data: ko.toJSON({tasks: self.tasks}),
            type: 'post', contentType: 'application/json',
            success: function(result) {
              alert(result);
            },
        });
    };
}

ko.applyBindings(new LocationsViewModel());
