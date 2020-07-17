import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationValue: new Animated.Value(1),
    };
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  handlePressIn() {
    Animated.spring(this.state.animationValue, {
      toValue: 2,
    }).start();
  }

  handlePressOut() {
    Animated.spring(this.state.animationValue, {
      toValue: 1,
      friction: 2,
      tension: 10,
    }).start();
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.state.animationValue }],
    };
    const { data } = this.props;
    var price = data.price;
    var price_text = '';
    var old_price = '';
    var price_view = null;
    if (data.discount_type === 'amount') {
      price -= data.discount;
      if (price === 0) {
        price_text = 'Free';
        price_view = <Text style={styles.text}>{price_text}</Text>;
      } else {
        price_text = price.toFixed(2) + '£ - ';
        old_price = data.price.toFixed(2) + '£';
        price_view = (
          <View style={styles.price_view}>
            <Text style={styles.text}>{price_text}</Text>
            <Text style={styles.text_discount}>{old_price}</Text>
          </View>
        );
      }
    } else if (data.discount_type === 'percentage') {
      price -= (price * data.discount) / 100;
      if (price === 0) {
        price_text = 'Free';
        price_view = <Text style={styles.text}>{price_text}</Text>;
      } else {
        price_text = price.toFixed(2) + '£ - ';
        old_price = data.price.toFixed(2) + '£';
        price_view = (
          <View style={styles.price_view}>
            <Text style={styles.text}>{price_text}</Text>
            <Text style={styles.text_discount}>{old_price}</Text>
          </View>
        );
      }
    } else {
      if (price === 0) {
        price_text = 'Free';
        price_view = <Text style={styles.text}>{price_text}</Text>;
      } else {
        price_text = price.toFixed(2) + '£';
        price_view = <Text style={styles.text}>{price_text}</Text>;
      }
    }

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={() =>
          this.props.navigation.navigate('Details', {
            data: data,
            price: price_text,
            old_price: old_price,
          })
        }>
        <Animated.View style={[styles.container, animatedStyle]}>
          <ImageBackground source={{ uri: data.image }} style={styles.image}>
            <View style={styles.info_bar}>
              <View style={styles.title_view}>
                <View>
                  <Text style={styles.text}>{data.name}</Text>
                  {price_view}
                </View>
                <View style={styles.avatar_view}>
                  <UserAvatar
                    size={20}
                    src="https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
                  />
                </View>
              </View>
              <Text style={styles.text_description}>
                {data.short_description}
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    aspectRatio: 4 / 3,
    justifyContent: 'flex-end',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
    flex: 1,
  },
  info_bar: {
    padding: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  price_view: {
    flexDirection: 'row',
  },
  avatar_view: {
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
  text_discount: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  text_description: {
    color: 'gray',
    fontSize: 12,
  },
});
