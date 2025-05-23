import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import { Platform, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styleMarker } from '@/components/Map/styles';

const MapMarker = ({ marker, pinColor, icon, onPress }) => {
  const coordinate = useMemo(
    () => ({
      latitude: marker.latitude,
      longitude: marker.longitude,
    }),
    [marker.latitude, marker.longitude]
  );

  if (!marker.latitude || !marker.longitude) {
    return null;
  }

  return (
    <Marker
      coordinate={coordinate}
      onPress={onPress}
      tracksViewChanges={Platform.OS === 'ios' ? false : undefined}
    >
      <View style={styleMarker.customMarkerContainer}>
        <View
          style={[
            styleMarker.markerCircle,
            { borderColor: pinColor }, // dynamic border
          ]}
        >
          <MaterialCommunityIcons name={icon} size={20} color={pinColor} />
        </View>
        <View
          style={[
            styleMarker.markerTail,
            { borderTopColor: pinColor }, // triangle tail color
          ]}
        />
      </View>
    </Marker>
  );
};

MapMarker.propTypes = {
  marker: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    title: PropTypes.string,
  }).isRequired,
  pinColor: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default MapMarker;
