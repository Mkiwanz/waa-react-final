import React, { useRef, useState } from "react";
import "./NewProperty.css";

function NewProperty() {
    const [newPropertyData, setNewPropertyData] = useState({});
    const pForm = useRef();
    const submitHandler = (e) => {
        e.preventDefault();
        const form = pForm.current;
        const data = {
            address: {
                street: form["street"].value,
                city: form["city"].value,
                state: form["state"].value,
                zipcode: form["zipcode"].value,
            },
            roomNumber: form["roomNumber"].value,
            bathNumber: form["bathNumber"].value,
            propertyStatus: form["propertyStatus"].value,
            area: form["area"].value,
            price: form["price"].value,
            image: form["image"].value,
            owner: 'owner',//From the query string or parameters(Params) 
        };
        data['image'].subString(indexOf('/'), data['image'].length);
        // alert('street=' + data.address['street'] + ', city=' + data.address['city'] + ', state=' + data.address['state']
        //     + ', zipcode=' + data.address['zipcode'] + ', room#=' + data['roomNumber'] + ', propertyStatus=' + data['propertyStatus']
        //     + ', bathroom#=' + data['bathNumber'] + ', area=' + data['area'] + ', price=' + data['price']);
        alert(data['image'].subString(indexOf('/'), data['image'].length););
    };

    return (
        <form ref={pForm} className="form1">
            <fieldset>
                <legend>Add new property</legend>
                <label>Street:<br /><input className="input1" type="text" required="required" name="street" size="65" /></label><br />
                <label>city:<br /><input className="input1" type="text" required="required" name="city" size="45" /></label><br />
                <label>State:<br /><input className="input1" type="text" required="required" name="state" size="45" /></label><br />
                <label>Zipcode:<br /><input className="input1" type="text" required="required" name="zipcode" size="10" /></label><br />
                <hr />
                <label>Rooms #:
                    <select name="roomNumber" className="input1">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                        <option value="4">four</option>
                        <option value="5">five</option>
                        <option value="6">six</option>
                        <option value="7">seven</option>
                    </select>
                </label><br />
                <label>Bathrooms #:
                    <select name="bathNumber" className="input1">
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3" >three</option>
                        <option value="4">four</option>
                        <option value="5">five</option>
                        <option value="6">six</option>
                        <option value="7">seven</option>
                    </select>
                </label><br />
                <label>propertyStatus:
                    <select name="propertyStatus" className="input1">
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="Contingent">contingent</option>
                    </select>
                </label><br />
                <label>Area of house in square metre &#8594; m<sup>2</sup><br /><input className="input1" type="text" required="required" name="area" size="5" /></label><br />
                <label>Price in &#36;:<br /><input className="input1" type="text" required="required" name="price" size="5" /></label><br />
                <hr />
                <label>images:<br /><input className="input1" type="file" multiple name="image" size="10" /></label><br />
                <hr />
                <input type="submit" id="button" onClick={submitHandler} />
            </fieldset>
        </form>
    )

}
export default NewProperty;