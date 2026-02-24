import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Time "mo:core/Time";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    supplierId : Nat;
    wholesalePrice : Float;
    retailPrice : Float;
  };

  type Supplier = {
    id : Nat;
    name : Text;
    contactInfo : Text;
  };

  type CustomOrder = {
    id : Nat;
    productId : Nat;
    quantity : Nat;
    customerName : Text;
    status : OrderStatus;
    timestamp : Time.Time;
  };

  type OrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  module CustomOrder {
    public func compareByTimestamp(o1 : CustomOrder, o2 : CustomOrder) : Order.Order {
      Nat.compare(o1.id, o2.id);
    };
  };

  let products = Map.empty<Nat, Product>();
  let suppliers = Map.empty<Nat, Supplier>();
  let orders = Map.empty<Nat, CustomOrder>();

  var nextProductId = 1;
  var nextSupplierId = 1;
  var nextOrderId = 1;

  public shared ({ caller }) func addProduct(name : Text, description : Text, supplierId : Nat, wholesalePrice : Float, retailPrice : Float) : async Nat {
    let productId = nextProductId;
    nextProductId += 1;

    let product : Product = {
      id = productId;
      name;
      description;
      supplierId;
      wholesalePrice;
      retailPrice;
    };

    products.add(productId, product);
    productId;
  };

  public shared ({ caller }) func addSupplier(name : Text, contactInfo : Text) : async Nat {
    let supplierId = nextSupplierId;
    nextSupplierId += 1;

    let supplier : Supplier = {
      id = supplierId;
      name;
      contactInfo;
    };

    suppliers.add(supplierId, supplier);
    supplierId;
  };

  public shared ({ caller }) func createOrder(productId : Nat, quantity : Nat, customerName : Text) : async Nat {
    let orderId = nextOrderId;
    nextOrderId += 1;

    let order : CustomOrder = {
      id = orderId;
      productId;
      quantity;
      customerName;
      status = #pending;
      timestamp = Time.now();
    };

    orders.add(orderId, order);
    orderId;
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderStatus) : async () {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = { order with status };
        orders.add(orderId, updatedOrder);
      };
    };
  };

  public query ({ caller }) func searchProducts(searchTerm : Text) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.name.contains(#text searchTerm) or product.description.contains(#text searchTerm);
      }
    );
  };

  public query ({ caller }) func getSupplierProducts(supplierId : Nat) : async [Product] {
    products.values().toArray().filter(
      func(product) { product.supplierId == supplierId }
    );
  };

  public query ({ caller }) func calculateProductProfit(productId : Nat) : async Float {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product.retailPrice - product.wholesalePrice };
    };
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async CustomOrder {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getAllOrdersSortedByTimestamp() : async [CustomOrder] {
    orders.values().toArray().sort(CustomOrder.compareByTimestamp);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getAllSuppliers() : async [Supplier] {
    suppliers.values().toArray();
  };
};
