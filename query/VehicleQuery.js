const qql = require('graphql-tag');

const vehicleListQuery = qql`
  query vehicleList($page: Int, $size: Int, $search: String) {
    vehicleList(
      page: $page, 
      size: $size, 
      search: $search, 
    ) {
      connectors {
        standard
        max_electric_power
        time
        speed
        power
      }
      id
      naming {
        make
        model
        version
        edition
        chargetrip_version
      }
      range {
        chargetrip_range {
          best
          worst
        }
      }
      media {
        image {
          id
          type
          url
          height
          width
          thumbnail_url
          thumbnail_height
          thumbnail_width
        }
      }
    }
  }
`;

module.exports = {
    vehicleListQuery,
};
