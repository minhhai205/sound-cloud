export const searchOption = (option) => {
  interface DataSearchOption {
    name: string,
    dataName: string,
    class: string,
    icon: string,
  }
  const dataSearchOption: DataSearchOption[] = [
    {
      name: "Everything",
      dataName: "",
      class: "",
      icon: "fa-search",     
    },
    {
      name: "Tracks",
      dataName: "songs",
      class: "",
      icon: "fa-music",
    },
    {
      name: "People",
      dataName: "people",
      class: "",
      icon: "fa-user",
    },
    {
      name: "Albums",
      dataName: "albums",
      class: "",
      icon: "fa-list-alt",
    },
    {
      name: "Playlists",
      dataName: "playlists",
      class: "",
      icon: "fa-list-alt",
    }
  ]

  if (option) {
    const index = dataSearchOption.findIndex(item => item.dataName == option);
    dataSearchOption[index].class = "active";
  } else {
    const index = dataSearchOption.findIndex(item => item.dataName == "");
    dataSearchOption[index].class = "active";
  }

  return dataSearchOption;
}