const SAMPLE_DATA = {
  collections: {
    sample_collection: {
      id: "sample_collection",
      title: "Up Next",
      taskIds: ["sample_task"]
    },
    sample_collection2: {
      id: "sample_collection2",
      title: "In Progress",
      taskIds: []
    },
    sample_collection3: {
      id: "sample_collection3",
      title: "Done",
      taskIds: []
    }
  },
  collectionOrder: [
    "sample_collection",
    "sample_collection2",
    "sample_collection3"
  ],
  tasks: {
    sample_task: { id: "sample_task", subject: "Sample Task", content: "" }
  }
};

export default SAMPLE_DATA;
