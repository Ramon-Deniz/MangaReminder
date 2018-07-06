import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, TextInput} from 'react-native';

export default class MangaReminderApp extends Component{
    render(){
        return(
            <View style={styles.mainMenu}>
                <View style={{flex: 1, backgroundColor: '#e67e22', justifyContent: 'center'}}>
                    <TitleText/>

                    <SubText
                        message="The easiest way to recieve notifications about new Manga chapters"
                    />
                </View>

                <View style={[styles.subMenu, {justifyContent: 'center'}]}>
                    <SubText
                        message="To receive notifcations about your
                        favorite Manga series, simply search by the title of 
                        the Manga"
                    />

                    <Search/>
                </View>

                <View style={styles.subMenu}>
                </View>
            </View>
        );
    }

    componentDidMount() {
        StatusBar.setHidden(true);
    }

}

class TitleText extends Component{
    render(){
        return(
            <Text style={[styles.basicText, styles.titleText]}>
                Manga Reminder
            </Text>
        );
    }
}

class SubText extends Component{
    render(){
        return(
            <Text style={[styles.basicText]}>
                {this.props.message}
            </Text>
        );
    }
}

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {text: ''};
    }

    render(){
        return(
            <TextInput
                placeholder="Name of Manga..."
                onChangeText={(text) => this.setState({text})}
                style={styles.searchInput}
                underlineColorAndroid='transparent'
            />
        );
    }
}

const styles = StyleSheet.create({
    mainMenu: {
        backgroundColor: '#34495e',
        flex: 1
    },

    subMenu: {
        backgroundColor: '#34495e',
        flex: 1,
    },

    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
    },

    basicText: {
        color: '#ecf0f1',
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    basicButton: {
        color: '#e67e22'
    },

    searchInput: {
        
    }
});
