export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Rustic Ramblers",
      };
      return h.view("about-view", viewData);
    },
  },
};
