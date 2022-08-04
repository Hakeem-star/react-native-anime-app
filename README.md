# Hakeems Anime App

An ambitious attempt to learn React Native, AWS, Prisma and Three JS.

## Todo -

### **2D**

- [x] Add a way to clear search input
- [x] Show empty state when there are no results
- [ ] Style pages in materialTop navigation
  - [x] Style ‘Tags’ and add option to extend to show more
  - [ ] Add pagination for Episodes page - if possible
- [x] Full screen image on tap
- [x] Add episode thumbnail behind episode name
- [x] Use WebView instead of going to an external browser - **Crunchyroll did not work with this implementation**
- [x] Sort tags alphabetically
- [x] Ask Maxim about scrolling the full page with the tabs
- [x] Fix gryroscope animation performance
- [ ] Add dropdown to show more episode details? - on **_long_** press, a dropdown appears to show release date and CTA to watch it
- [ ] Add modal for tag description - Add page instead. When tag is clicked, open page with description and link to related shows
- [ ] Add user account management with aws

### 3D

- [ ] Design main page (with tv & camera)
- [ ] Place basic assets

Issues

Height issue - Ran into an issue with the height of the screens in createMaterialTopTabNavigator. I want to be able to scroll the navigator along with the page, but for some reason the navigator is not taking the child views height. Possibly being overwritten within the component

# To run locally -

#### Start expo -

cd app

yarn install

yarn start

#### Start server -

cd server

yarn install

yarn start
