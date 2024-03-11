export const seedData = {
    users: {
      _model: "User",
      joe: {
        firstName: "Joe",
        lastName: "Bloggs",
        email: "jbloggs@gmail.com",
        password: "HDip24"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      }
    },
    trektypes: {
        _model: "Trektype",
        mountains: {
          title: "Mountains",
          userid: "->users.joe"
        },
        forests: {
          title: "Forests",
          userid: "->users.joe"
        },
        hills: {
          title: "HillWalks",
          userid: "->users.joe"
        },
        green: {
            title: "Greenways",
            userid: "->users.joe"
          }
    },
    placemarks: {
        _model: "Placemark",
        mangerton: {
          title: "Mangerton",
          details: "8,025m Grade 2",
          location: "Kerry",
          trektypeid: "->trektypes.mountains"
        },
        slievenamon: {
          title: "Slievenamon",
          details: "6,025m Grade 4",
          location: "Tipperary",
          trektypeid: "->trektypes.mountains"
        },
        dungarvan: {
          title: "Dungarvan GW",
          details: "25km Coast line route",
          location: "Waterford",
          trektypeid: "->trektypes.green"
        },
        western: {
            title: "Great western Greenway",
            details: "25km Coast line route",
            location: "Mayo",
            trektypeid: "->trektypes.green"
          },
        jenkins: {
            title: "Jenkinstown Woods",
            details: "10km loop",
            location: "Kilkenny",
            trektypeid: "->trektypes.forests"
          },
        Castlecomer: {
            title: "Comer loop Hillwalk",
            details: "10km loop",
            location: "Kilkenny",
            trektypeid: "->trektypes.hills"
      }
    }
};